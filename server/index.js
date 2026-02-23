import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: { origin: ["http://localhost:5174", "http://127.0.0.1:5174"] },
});

const rooms = new Map();

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

io.on("connection", (socket) => {
  socket.on("create-room", ({ gameId, challengeId }) => {
    let code = generateRoomCode();
    while (rooms.has(code)) code = generateRoomCode();

    rooms.set(code, {
      gameId,
      challengeId,
      hostId: socket.id,
      guestId: null,
      hostResult: null,
      guestResult: null,
      status: "waiting",
    });

    socket.join(code);
    socket.emit("room-created", { roomCode: code });
  });

  socket.on("join-room", ({ roomCode }) => {
    const room = rooms.get(roomCode);
    if (!room) {
      socket.emit("join-error", { message: "ルームが見つかりません" });
      return;
    }
    if (room.guestId) {
      socket.emit("join-error", { message: "ルームは満員です" });
      return;
    }

    room.guestId = socket.id;
    socket.join(roomCode);
    socket.to(roomCode).emit("opponent-joined");
    socket.emit("room-joined", { roomCode });
    io.to(roomCode).emit("game-start", { challengeId: room.challengeId });
  });

  socket.on("submit-result", ({ roomCode, result, isHost }) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    if (isHost) room.hostResult = result;
    else room.guestResult = result;

    const bothDone = room.hostResult && room.guestResult;
    if (bothDone) {
      room.status = "finished";
      io.to(roomCode).emit("game-finished", {
        hostResult: room.hostResult,
        guestResult: room.guestResult,
      });
      rooms.delete(roomCode);
    } else {
      socket.to(roomCode).emit("opponent-submitted");
    }
  });

  socket.on("disconnect", () => {
    for (const [code, room] of rooms) {
      if (room.hostId === socket.id || room.guestId === socket.id) {
        socket.to(code).emit("opponent-left");
        rooms.delete(code);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
