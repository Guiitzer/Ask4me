import { FormEvent, useState } from "react";
import { useHistory } from "react-router";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleImage from "../../assets/images/google-icon.svg";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import ErrorModal from "../../components/ErrorModal";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/newroom");
  }
  async function handleJoinRoom(event: FormEvent) {
    setError(false);
    event.preventDefault();
    // Validação se existe algo no input, se for vazio ele pausa a exec.
    if (roomCode.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      setError(true);
      setErrorMessage("Sala não existente");
      return;
    }
    if (roomRef.val().endedAt) {
      setError(true);
      setErrorMessage("A sala foi encerrada");
      return;
    }
    history.push(`/room/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração" />
        <strong>Crie salas de Perguntas e Respostas ao-vivo</strong>
        <p>Interaja com seu publico e tire dúvidas em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="ask4me" />
          {user ? (
          <>
            <div className="logged">
                 <span>logged as</span>
                <div>
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              </div>
          </>
          ): ''}
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleImage} alt="logo-google" />
            Crie sua sala utilizando o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              onChange={(e) => setRoomCode(e.target.value)}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
        {error && <ErrorModal errorMessage={errorMessage} />}
      </main>
    </div>
  );
}
