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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const UserService_1 = __importDefault(require("../services/UserService"));
const router = express_1.default.Router();
const LogManager_1 = __importDefault(require("../services/LogManager"));
// GET /users
// query with email for one user, or no email for all
router
    .route("/users")
    .get((0, express_validator_1.query)("email").optional().isEmail(), UserService_1.default.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\nGET /users");
    console.log("Query: " + JSON.stringify(req.query));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors.array()) + "\n");
        return res.status(400).json({ errors: errors.array() });
    }
    if (req.user.level !== "admin" && req.user.email) {
        console.log("ONLY YOU DUDE");
        req.query.email = req.user.email;
        // return res.status(400).json({ error: "Invalid Authorization" });
    }
    try {
        const response = yield UserService_1.default.getUser(req.query.email);
        console.log("Success 200: " + JSON.stringify(response.output) + "\n");
        return res.status(response.status).json(response.output);
    }
    catch (e) {
        return console.log("Error: " + e + "\n");
    }
}));
// POST /users
router
    .route("/users")
    .post((0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isString().isLength({ min: 8 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\nPOST /users");
    console.log("Body: " + JSON.stringify(req.body));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors.array()) + "\n");
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const response = yield UserService_1.default.createUser(req.body);
        console.log("Success 200: " + JSON.stringify(response.output) + "\n");
        return res.status(response.status).json(response.output);
    }
    catch (e) {
        return console.log("Error: " + e + "\n");
    }
}));
// POST /users/login
router
    .route("/users/login")
    .post((0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isString().isLength({ min: 8 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\nPOST /users/login");
    console.log("Body: " + JSON.stringify(req.body));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors.array()) + "\n");
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const response = yield UserService_1.default.login(req.body);
        console.log("Success 200: " + JSON.stringify(response.output) + "\n");
        return res.status(response.status).json(response.output);
    }
    catch (e) {
        return console.log("Error: " + e + "\n");
    }
}));
router.route("/users/auth").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("\nGET /users/auth");
    // console.log("Query: " + JSON.stringify(req.query));
    LogManager_1.default.urr({ method: "GET", endpoint: "/users/auth", req });
    UserService_1.default.authenticate(req, res, () => {
        return res.status(200).json({ message: "User is Authenticated" });
    });
}));
// DELETE /users
router
    .route("/users")
    .delete((0, express_validator_1.body)("email").isEmail().optional(), (0, express_validator_1.body)("_id").isMongoId().optional(), (0, express_validator_1.body)("email").if((0, express_validator_1.body)("_id").not().exists()).exists(), (0, express_validator_1.body)("_id").if((0, express_validator_1.body)("email").not().exists()).exists(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\nDELETE /users");
    console.log("Body: " + JSON.stringify(req.body));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log("Error 400: " + JSON.stringify(errors) + "\n");
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const response = yield UserService_1.default.deleteUser(req.body);
        console.log("Success 200: " + JSON.stringify(response.output) + "\n");
        return res.status(response.status).json(response.output);
    }
    catch (e) {
        return console.log("Error: " + e + "\n");
    }
}));
// GET /authlevel
router.route("/authlevel").get(UserService_1.default.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\nGET /authlevel");
    console.log("Header: " + JSON.stringify(req.headers["authorization"]));
    req.user;
}));
module.exports = router;
//# sourceMappingURL=users.js.map