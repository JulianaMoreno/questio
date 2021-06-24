
import React from 'react';
import mainImage from '../assets/images/illustration.svg';
import googleIcon from '../assets/images/google-icon.svg';
import Button from '../components/Button';
import '../styles/auth.scss';

export const Home = () => {
   return (
        <div id="page-auth">
            <aside>
                <img src={mainImage} alt="Imagem simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo </strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <strong>Quest.io</strong>
                    <button className="btn-google">
                        <img src={googleIcon} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Home;