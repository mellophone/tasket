import { ObjectId } from "mongodb";
import database from "../db/conn";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import LogManager from "./LogManager";

class UserService {
  static async getUser(email?: string, _id?: ObjectId) {
    let db = database.getDb("UserInfo");
    const response = {
      status: 200,
      output: {},
    };

    let users;
    if (email) {
      users = await db.collection("Users").findOne({ email });
    } else if (_id) {
      users = await db.collection("Users").findOne({ _id });
    } else {
      users = await db.collection("Users").find({}).toArray();
    }

    if (!users) {
      response.status = 400;
      response.output = { message: "User not found" };
      return response;
    }

    response.output = users;
    return response;
  }

  static async createUser(user: { email: string; password: string }) {
    let db = database.getDb("UserInfo");
    const response = {
      status: 200,
      output: {},
    };

    if (
      (await db.collection("Users").findOne({ email: user.email })) !== null
    ) {
      response.status = 400;
      response.output = { message: "User already exists" };
      return response;
    }

    try {
      const hashed = await bcrypt.hash(user.password, 10);
      const newUser = {
        email: user.email,
        password: hashed,
        level: "user",
        groups: [],
        settings: {
          color: "Red",
        },
        timestamp: new Date().toISOString(),
      };

      const confirmation = await db.collection("Users").insertOne(newUser);
      confirmation.inserted = newUser;
      response.output = confirmation;
      return response;
    } catch (e) {
      response.status = 400;
      response.output = { message: "Error: " + e };
      return response;
    }
  }

  static async deleteUser(user: { email?: string; _id?: string }) {
    let db = database.getDb("UserInfo");
    const response = {
      status: 200,
      output: {},
    };
    if (!user.email) {
      if (
        (await db
          .collection("Users")
          .findOne({ _id: new ObjectId(user._id) })) === null
      ) {
        response.status = 400;
        response.output = { message: "User not found" };
        return response;
      }
      const confirmation = await db
        .collection("Users")
        .deleteOne({ _id: new ObjectId(user._id) });
      response.output = confirmation;
      return response;
    }

    if (
      (await db.collection("Users").findOne({ email: user.email })) === null
    ) {
      response.status = 400;
      response.output = { message: "User not found" };
      return response;
    }

    const confirmation = await db
      .collection("Users")
      .deleteOne({ email: user.email });
    response.output = confirmation;
    return response;
  }

  static async login(credentials: { email: string; password: string }) {
    let db = database.getDb("UserInfo");
    const response = {
      status: 200,
      output: {},
    };
    const user = await db
      .collection("Users")
      .findOne({ email: credentials.email });
    if (user === null) {
      response.status = 400;
      response.output = { message: "User not found" };
      return response;
    }
    try {
      if (await bcrypt.compare(credentials.password, user.password)) {
        const rawToken = {
          type: "user",
          _id: user._id,
        };
        const token = jwt.sign(rawToken, process.env.JWT_SECRET, {
          // expiresIn: 10,
        });
        response.output = token;
        return response;
      }
    } catch (e) {}
    response.status = 400;
    response.output = { message: "Error signing token" };
    return response;
  }

  static async getAuthLevel(email: string) {
    let db = database.getDb("UserInfo");
    const response = {
      status: 200,
      output: {},
    };

    const user = await this.getUser(email);
    // if(!user.output.authlevel)
  }

  static authenticate = async (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, rawToken) => {
      LogManager.logAuth(rawToken);
      if (err) {
        LogManager.logError(`${err}`, `UserService.ts > authenticate()`);
        return res.status(400).json({ error: err });
      }
      let db = database.getDb("UserInfo");
      req.token = rawToken;
      next();
    });
  };

  static createKeys = (amount: number) => {
    const keys = [];
    for (let i = 0; i < amount; i++) {
      const token = jwt.sign({ type: "admin" }, process.env.JWT_SECRET, {
        // expiresIn: 10,
        keyid: `${i}`,
      });
      keys.push(token);
    }
    return keys;
  };
}

export default UserService;
