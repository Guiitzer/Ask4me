import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss';


export function Room(){
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Ask4me" />
          <div>Código da Sala</div>
        </div>
      </header>

      <div className="question-area">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>2 perguntas</span>
        </div>

        <form>
          <textarea 
            placeholder="Digite sua pergunta..."
          />
          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            <Button type='submit'>Enviar pergunta</Button>
          </div>
        </form>
      </div>
    </div>
  )
}