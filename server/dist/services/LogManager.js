"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogManager {
}
LogManager.urr = (userRequest) => {
    const timestamp = new Date().toUTCString();
    console.log(`${timestamp}
        ${userRequest.method} "${userRequest.endpoint}"
        ${userRequest.method === "GET" ? "Query" : "Body"}: ${userRequest.method === "GET"
        ? userRequest.req.params
        : userRequest.req.body}`);
};
exports.default = LogManager;
//# sourceMappingURL=LogManager.js.map