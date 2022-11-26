"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/users"));
const conn_1 = __importDefault(require("./db/conn"));
app.listen(port, () => {
    // perform a database connection when server starts
    conn_1.default.connectToServer(function (err) {
        if (err)
            console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});
//# sourceMappingURL=server.js.map