"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const RoomManager_1 = require("./RoomManager");
class UserManager {
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager_1.RoomManager();
    }
    addUser(name, socket) {
        this.users.push({ name, socket });
        this.queue.push(socket.id);
        socket.send("loby");
        this.clearQueue();
        this.initHandlers(socket);
    }
    removeUser(socketId) {
        const user = this.users.find((x) => x.socket.id === socketId);
        this.users = this.users.filter((x) => x.socket.id !== socketId);
    }
    // this is to match the user and cannot do  [ chirag || chirag ]  at the same time
    clearQueue() {
        if (this.queue.length < 2)
            return;
        const id1 = this.queue.pop();
        const id2 = this.queue.pop();
        const user1 = this.users.find((x) => x.socket.id === id1);
        const user2 = this.users.find((x) => x.socket.id === id2);
        if (!user1 || !user2)
            return;
        console.log("i am also creating room ");
        const room = this.roomManager.createRoom(user1, user2);
        this.clearQueue();
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp);
        });
    }
}
exports.UserManager = UserManager;
