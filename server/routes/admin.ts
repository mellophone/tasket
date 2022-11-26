import express from "express";
import { query, validationResult } from "express-validator";
import LogManager from "../services/LogManager";
import UserService from "../services/UserService";
const router = express.Router();

// GET /keys
router
  .route("/keys")
  .get(
    UserService.authenticate,
    query("amount").isNumeric().optional(),
    async (req, res) => {
      LogManager.logRequest({ method: "GET", endpoint: "/keys", req });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors.array()) + "\n");
        return res.status(400).json({ errors: errors.array() });
      }

      let keys: any[];
      if (!req.query.amount) {
        keys = UserService.createKeys(1);
      } else {
        keys = UserService.createKeys(req.query.amount);
      }

      LogManager.logResponse({ status: 200, output: keys });
      return res.status(200).json(keys);
    }
  );

module.exports = router;
