"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const UserManager_1 = require("./Managers/UserManager");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const userManager = new UserManager_1.UserManager();
io.on("connection", (socket) => {
    console.log("a user connected");
    userManager.addUser("randomName", socket);
    socket.on("disconnect", () => {
        userManager.removeUser(socket.id);
    });
});
server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
