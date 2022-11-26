"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const conn_1 = __importDefault(require("../db/conn"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    static getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = conn_1.default.getDb("UserInfo");
            const response = {
                status: 200,
                output: {},
            };
            if (email === undefined) {
                const users = yield db.collection("Users").find({}).toArray();
                response.output = users;
                return response;
            }
            const user = yield db.collection("Users").findOne({ email });
            if (!user) {
                response.status = 400;
                response.output = { message: "User not found" };
                return response;
            }
            response.output = user;
            return response;
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = conn_1.default.getDb("UserInfo");
            const response = {
                status: 200,
                output: {},
            };
            if ((yield db.collection("Users").findOne({ email: user.email })) !== null) {
                response.status = 400;
                response.output = { message: "User already exists" };
                return response;
            }
            try {
                const hashed = yield bcrypt_1.default.hash(user.password, 10);
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
                const confirmation = yield db.collection("Users").insertOne(newUser);
                confirmation.inserted = newUser;
                response.output = confirmation;
                return response;
            }
            catch (e) {
                response.status = 400;
                response.output = { message: "Error: " + e };
                return response;
            }
        });
    }
    static deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = conn_1.default.getDb("UserInfo");
            const response = {
                status: 200,
                output: {},
            };
            if (!user.email) {
                if ((yield db
                    .collection("Users")
                    .findOne({ _id: new mongodb_1.ObjectId(user._id) })) === null) {
                    response.status = 400;
                    response.output = { message: "User not found" };
                    return response;
                }
                const confirmation = yield db
                    .collection("Users")
                    .deleteOne({ _id: new mongodb_1.ObjectId(user._id) });
                response.output = confirmation;
                return response;
            }
            if ((yield db.collection("Users").findOne({ email: user.email })) === null) {
                response.status = 400;
                response.output = { message: "User not found" };
                return response;
            }
            const confirmation = yield db
                .collection("Users")
                .deleteOne({ email: user.email });
            response.output = confirmation;
            return response;
        });
    }
    static login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = conn_1.default.getDb("UserInfo");
            const response = {
                status: 200,
                output: {},
            };
            const user = yield db
                .collection("Users")
                .findOne({ email: credentials.email });
            if (user === null) {
                response.status = 400;
                response.output = { message: "User not found" };
                return response;
            }
            try {
                if (yield bcrypt_1.default.compare(credentials.password, user.password)) {
                    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                    // expiresIn: 10,
                    });
                    response.output = token;
                    return response;
                }
            }
            catch (e) { }
            response.status = 400;
            response.output = { message: "Error signing token" };
            return response;
        });
    }
    static getAuthLevel(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = conn_1.default.getDb("UserInfo");
            const response = {
                status: 200,
                output: {},
            };
            const user = yield this.getUser(email);
            // if(!user.output.authlevel)
        });
    }
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = req.headers["authorization"];
            const token = header && header.split(" ")[1];
            if (token === null) {
                console.log("NO TOKEN FOUND");
            }
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, token) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log("INVALID TOKEN");
                    return res.status(400).json({ error: "Invalid Token" });
                } //invalid token
                let db = conn_1.default.getDb("UserInfo");
                console.log(token.id);
                const id = new mongodb_1.ObjectId(token.id);
                const user = yield db.collection("Users").findOne({ _id: id });
                if (!user) {
                    console.log("INVALID GUY");
                    return res.status(400).json({ error: "Invalid Token" });
                }
                req.user = user;
                next();
            }));
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map