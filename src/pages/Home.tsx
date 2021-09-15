import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImage from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home(){
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
            <button className='create-room'>
                <img src={googleImage} alt="logo-google" />
                Crie sua sala utilizando o Google
            </button>
            <div className="separator">ou entre em uma sala</div>
            <form>
                <input type="text" placeholder="Digite o código da sala" />
                <Button type='submit'>Entrar na sala</Button>
            </form>
        </div>
    </main>
</div>
)
}