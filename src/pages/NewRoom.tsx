import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import mainImage from '../assets/images/illustration.svg';
import Button from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';


export const NewRoom = () => {
    const { user } = useAuth();
    const history = useHistory();
    const [roomName, setRoomName] = useState('');

    /*
    useEffect( () => {
        console.log('user', user);
        if (!user?.id) {
            history.push('/');
        }
    }, [user, history]);
    */

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        // vamos garantir que o usuario não deu apenas espaço
        if (roomName.trim() === '') {
            return;
        }

        //salvando dados no firebase
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            name: roomName,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }

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
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setRoomName(event.target.value)}
                            value={roomName}
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