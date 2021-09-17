import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "../../styles/auth.scss";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    // Validação se existe algo no input, se for vazio ele pausa a exec.
    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
    history.push(`admin/room/${firebaseRoom.key}`);
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
          <h2> Crie uma nova sala </h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <Button type="submit">Criar Sala</Button>
          </form>
          <p>
            Já possui um código de sala? <Link to="/">Clique aqui!</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
