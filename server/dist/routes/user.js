"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conn_1 = __importDefault(require("../db/conn"));
const routes = express_1.default.Router();
const ObjectId = require("mongodb").ObjectId;
routes.route("/user").get((req, res) => {
    let db_connect = conn_1.default.getDb("UserInfo");
    db_connect
        .collection("Users")
        .find({})
        .toArray((err, result) => {
        if (err)
            throw err;
        res.json(result);
    });
});
module.exports = routes;
//# sourceMappingURL=user.js.map