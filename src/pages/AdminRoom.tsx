import { FormEvent } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import useRoom from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const { question, title } = useRoom(params.id);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("Você precisa estar logado.");
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${params.id}/questions/`).push(question);
    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Ask4me" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <div className="question-area">
        <div className="room-title">
          <h1>Nome da sala: {title}</h1>
          {question.length > 0 ? (
            question.length < 2 ? (
              <span>Uma pergunta</span>
            ) : (
              <span>{question.length} perguntas</span>
            )
          ) : (
            ""
          )}
        </div>

        <div className="question-list">
          {question.map((item) => {
            return (
              <Question
                key={item.id}
                content={item.content}
                author={item.author}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
