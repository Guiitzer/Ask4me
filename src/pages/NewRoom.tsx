import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImage from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
import { Button } from '../components/Button';

export function NewRoom(){
return(
<div id='page-auth'>
    <aside>
        <img src={illustrationImg} alt='Ilustração' />
        <strong>Crie salas de Perguntas e Respostas ao-vivo</strong>
        <p>Interaja com seu publico e tire dúvidas em tempo real</p>
    </aside>
    <main>
        <div className="main-content">
            <img src={logoImg} alt="ask4me" />
          <h2> Crie uma nova sala </h2>
            <form>
                <input type="text" placeholder="Nome da sala" />
                <Button type='submit'>Criar Sala</Button>
            </form>
            <p>Já possui um código de sala? <a href='#'>Clique aqui!</a></p>
        </div>
    </main>
</div>
)
}