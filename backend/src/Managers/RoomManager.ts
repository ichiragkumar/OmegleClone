import { User } from "./UserManager";
import { Socket } from "socket.io";

let GLOBAL_ROOM_ID = 1;
export interface Room {
  user1: User;
  user2: User;
}
export class RoomManager {
  private rooms: Map<String, Room>;

  constructor() {
    this.rooms = new Map<string, Room>();
  }
  createRoom(user1: User, user2: User) {
    const roomId = this.generate().toString();
    this.rooms.set(roomId.toString(), {
      user1,
      user2,
    });

    user1?.socket.emit("send-offer", {
      roomId,
    });
  }

  onOffer(roomId: string, sdp: string) {
    const user2 = this.rooms.get(roomId)?.user2;
    user2?.socket.emit("offer", {
      sdp,
      roomId,
    });
  }

  onAnswer(roomId: string, sdp: string) {
    const user1 = this.rooms.get(roomId)?.user1;
    user1?.socket.emit("answer", {
      sdp,
      roomId,
    });
  }
  generate() {
    return GLOBAL_ROOM_ID++;
  }
}
