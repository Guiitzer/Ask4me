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
import ExitButton from "../../components/ExitButton";

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
        <div>
            <ExitButton />
            <img src={logoImg} alt="Ask4me" />
          </div>
          <div>
            <RoomCode code={params.id} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <div className="user-logged">
        <img src={user?.avatar} alt={user?.name} />
          <span>Administrador:</span>
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
                <Tooltip title="Curtir a pergunta">
                    <button
                      className={`like-button ${item.likeId && "liked"}`}
                      type="button"
                      aria-label="Marcar como Gostei"
                      
                    >
                      {item.likeCount > 0 && <span>{item.likeCount}</span>}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                          stroke="#737380"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </Tooltip>
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
