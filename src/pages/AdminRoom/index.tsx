import { useHistory, useParams } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button";
import { database } from "../../services/firebase";
import DeleteQuestionButton from "../../components/DeleteQuestionButton";
import Question from "../../components/Question";
import RoomCode from "../../components/RoomCode";
import useRoom from "../../hooks/useRoom";
import "./index.scss";

import { Tooltip } from "@mui/material";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const { question, title } = useRoom(params.id);

  async function handleEndRoom(){
    await database.ref(`rooms/${params.id}`).update({ 
      endedAt: new Date(),
    })
    history.push('/')
  }

  async function handleHightlightQuestion(questionId: string){
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({ 
      isHighLighted: true,
    })
  }

  async function handleCheckQuestionAsAnswered(questionId: string){
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({ 
      isAnswered: true,
    })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Ask4me" />
          <div>
            <RoomCode code={params.id} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
          </div>
        </div>
          <button onClick={()=>{
          history.push(`/`)
        }}>🚪 SAIR</button>
      </header>

      <div className="user-info">
        <img src={user?.avatar} alt={user?.name} />
          <span>Logado como:</span>
        <span>{user?.name}</span>
      </div>  
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
                isAnswered={item.isAnswered}
                isHighLighted={item.isHighLighted}
              >
               {!item.isAnswered ? 
                <>
                <Tooltip title="Marcar pergunta como respondida">
                <button
                  type="button"
                  onClick={()=>handleCheckQuestionAsAnswered(item.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                </Tooltip>
                <Tooltip title="Dar destaque a pergunta">
                  <button
                    type="button"
                    onClick={()=>handleHightlightQuestion(item.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                </Tooltip>
                </>
              : '' }
                <DeleteQuestionButton id={item.id} room={params.id}  />
              </Question>
            );
          })}
        </div>
      </div>
    </div>
  );
}
