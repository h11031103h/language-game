import { useState, useEffect } from "react";
import "./VersusLobby.css";

interface VersusLobbyProps {
  roomCode: string | null;
  status: string;
  error: string | null;
  createRoom: () => void;
  joinRoom: (code: string) => void;
  onReady: () => void;
}

export function VersusLobby({
  roomCode,
  status,
  error,
  createRoom,
  joinRoom,
  onReady,
}: VersusLobbyProps) {
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    if (status === "playing") onReady();
  }, [status, onReady]);

  if (status === "playing") return null;

  return (
    <div className="versus-lobby">
      <h3 className="versus-lobby-title">AB対戦</h3>

      {error && (
        <div className="versus-lobby-error">{error}</div>
      )}

      {status === "idle" && (
        <div className="versus-lobby-options">
          <div className="versus-option">
            <h4>ルームを作成</h4>
            <p>コードを相手に共有して、待ちましょう</p>
            <button className="versus-btn primary" onClick={createRoom}>
              ルームを作成
            </button>
          </div>
          <div className="versus-divider">または</div>
          <div className="versus-option">
            <h4>ルームに参加</h4>
            <p>相手からもらったコードを入力</p>
            <input
              type="text"
              className="versus-input"
              placeholder="ABC123"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              maxLength={6}
            />
            <button
              className="versus-btn"
              onClick={() => joinRoom(joinCode)}
              disabled={joinCode.length < 4}
            >
              参加する
            </button>
          </div>
        </div>
      )}

      {status === "creating" && (
        <div className="versus-lobby-loading">接続中...</div>
      )}

      {status === "waiting" && roomCode && (
        <div className="versus-lobby-waiting">
          <p>相手の参加を待っています</p>
          <div className="versus-room-code">{roomCode}</div>
          <p className="versus-room-hint">このコードを相手に共有してください</p>
        </div>
      )}
    </div>
  );
}
