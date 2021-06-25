import { Link } from 'react-router-dom';
import mainImage from '../assets/images/illustration.svg';
import Button from '../components/Button';
import '../styles/auth.scss';
//import { useAuth } from '../hooks/useAuth';


export const NewRoom = () => {
    //const { user } = useAuth();

   return (
        <div id="page-auth">
            <aside>
                <img src={mainImage} alt="Imagem simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo </strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <h1>Quest.io</h1>
                    <h2>Crie uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala já existente?
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default NewRoom;