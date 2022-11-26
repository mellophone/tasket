import express from "express";
import { body, query, validationResult } from "express-validator";
import UserService from "../services/UserService";

const router = express.Router();
import { ObjectId } from "mongodb";
import LogManager from "../services/LogManager";

// GET /users
// query with email for one user, or no email for all
router
  .route("/users")
  .get(
    query("email").optional().isEmail(),
    UserService.authenticate,
    async (req, res) => {
      LogManager.logRequest({ method: "GET", endpoint: "/users", req });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors.array()) + "\n");
        return res.status(400).json({ errors: errors.array() });
      }

      const { type } = req.token;
      if (type === "user") {
        const { _id } = req.token;
        const response = await UserService.getUser(null, new ObjectId(_id));
        LogManager.logResponse(response);
        return res.status(response.status).json(response.output);
      } else if (type === "admin") {
        const response = await UserService.getUser(req.query.email);
        LogManager.logResponse(response);
        return res.status(response.status).json(response.output);
      }
      return res.status(400).json({ message: "Invalid Authentication" });
    }
  );

// POST /users
router
  .route("/users")
  .post(
    body("email").isEmail(),
    body("password").isString().isLength({ min: 8 }),
    async (req, res) => {
      console.log("\nPOST /users");
      console.log("Body: " + JSON.stringify(req.body));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors.array()) + "\n");
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const response = await UserService.createUser(req.body);
        console.log("Success 200: " + JSON.stringify(response.output) + "\n");
        return res.status(response.status).json(response.output);
      } catch (e) {
        return console.log("Error: " + e + "\n");
      }
    }
  );

// POST /users/login
router
  .route("/users/login")
  .post(
    body("email").isEmail(),
    body("password").isString().isLength({ min: 8 }),
    async (req, res) => {
      console.log("\nPOST /users/login");
      console.log("Body: " + JSON.stringify(req.body));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors.array()) + "\n");
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const response = await UserService.login(req.body);
        console.log("Success 200: " + JSON.stringify(response.output) + "\n");
        return res.status(response.status).json(response.output);
      } catch (e) {
        return console.log("Error: " + e + "\n");
      }
    }
  );

router.route("/users/auth").get(async (req, res) => {
  LogManager.logRequest({ method: "GET", endpoint: "/users/auth", req });

  UserService.authenticate(req, res, () => {
    const authMessage = { message: "User is Authenticated" };
    LogManager.logResponse(authMessage);
    return res.status(200).json(authMessage);
  });
});

// DELETE /users
router
  .route("/users")
  .delete(
    body("email").isEmail().optional(),
    body("_id").isMongoId().optional(),
    body("email").if(body("_id").not().exists()).exists(),
    body("_id").if(body("email").not().exists()).exists(),
    async (req, res) => {
      console.log("\nDELETE /users");
      console.log("Body: " + JSON.stringify(req.body));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors) + "\n");
        res.status(400).json({ errors: errors.array() });
      }

      try {
        const response = await UserService.deleteUser(req.body);
        console.log("Success 200: " + JSON.stringify(response.output) + "\n");
        return res.status(response.status).json(response.output);
      } catch (e) {
        return console.log("Error: " + e + "\n");
      }
    }
  );

// GET /authlevel
router.route("/authlevel").get(UserService.authenticate, async (req, res) => {
  console.log("\nGET /authlevel");
  console.log("Header: " + JSON.stringify(req.headers["authorization"]));
  req.user;
});

module.exports = router;
