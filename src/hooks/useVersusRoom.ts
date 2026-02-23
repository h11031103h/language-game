import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import type { GameId } from "../types";
import type { GameResult } from "../types";

// Dev: Vite proxy forwards /socket.io to server. Prod: same origin or set VITE_SOCKET_URL
const SOCKET_URL = import.meta.env.DEV ? "" : (import.meta.env.VITE_SOCKET_URL || "");

export function useVersusRoom(gameId: GameId, challengeId: string) {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "creating" | "waiting" | "playing" | "finished">("idle");
  const [error, setError] = useState<string | null>(null);
  const [opponentResult, setOpponentResult] = useState<GameResult | null>(null);
  const [isHost, setIsHost] = useState(false);

  const createRoom = useCallback(() => {
    if (!SOCKET_URL) {
      setError("サーバーに接続できません。npm run server でサーバーを起動してください。");
      return;
    }
    setStatus("creating");
    setError(null);
    const s = io(SOCKET_URL);
    setSocket(s);

    s.on("connect", () => {
      s.emit("create-room", { gameId, challengeId });
    });

    s.on("room-created", ({ roomCode: code }: { roomCode: string }) => {
      setRoomCode(code);
      setStatus("waiting");
      setIsHost(true);
    });

    s.on("opponent-joined", () => {
      setStatus("playing");
    });

    s.on("game-start", () => {
      setStatus("playing");
    });

    s.on("game-finished", ({ guestResult }: { hostResult: GameResult; guestResult: GameResult }) => {
      setOpponentResult(guestResult);
      setStatus("finished");
    });

    s.on("opponent-submitted", () => {
      // 相手が先に提出した
    });

    s.on("opponent-left", () => {
      setError("相手が退出しました");
      setStatus("idle");
    });
  }, [gameId, challengeId]);

  const joinRoom = useCallback((code: string) => {
    if (!SOCKET_URL) {
      setError("サーバーに接続できません");
      return;
    }
    setStatus("creating");
    setError(null);
    const s = io(SOCKET_URL);
    setSocket(s);

    s.on("connect", () => {
      s.emit("join-room", { roomCode: code.toUpperCase() });
    });

    s.on("room-joined", ({ roomCode: rc }: { roomCode: string }) => {
      setRoomCode(rc);
      setStatus("playing");
      setIsHost(false);
    });

    s.on("join-error", ({ message }: { message: string }) => {
      setError(message);
      setStatus("idle");
    });

    s.on("game-start", () => {
      setStatus("playing");
    });

    s.on("game-finished", ({ hostResult }: { hostResult: GameResult; guestResult: GameResult }) => {
      setOpponentResult(hostResult);
      setStatus("finished");
    });

    s.on("opponent-left", () => {
      setError("相手が退出しました");
      setStatus("idle");
    });
  }, []);

  const submitResult = useCallback((result: GameResult, isHost: boolean) => {
    if (socket && roomCode) {
      socket.emit("submit-result", { roomCode, result, isHost });
    }
  }, [socket, roomCode]);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return {
    roomCode,
    status,
    error,
    opponentResult,
    createRoom,
    joinRoom,
    submitResult,
    isHost,
  };
}
