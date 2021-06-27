import { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';

export const Room = () => {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [question, setQuestion] = useState<Question[]>([]);
    const [roomName, setRoomName] = useState('');

    const roomId = params.id;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.once('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestion: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestion).map(
                ([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighLighted: value.isHighLighted,
                        isAnswered: value.isAnswered,
                    }
                });

            setRoomName(databaseRoom.name);
            setQuestion(parsedQuestions);
        })
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if(!user) {
            throw new Error("You should be logged in");
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        //limpar o texto após salvar
        setNewQuestion('');
    }

     return (
         <div id="page-room">
             <header>
                 <div className="content">
                     <strong>Quest.io</strong>
                     <RoomCode code={roomId}/>
                 </div>
             </header>

             <main>
                <div className="room-title">
                    <h1>{roomName}</h1>
                    {question.length > 0 && <span>{question.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion} >
                    <textarea
                        placeholder="Faça sua pergunta aqui"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name}/>
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta,
                                <button>faça seu login</button>
                            </span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>
             </main>
         </div>
     )
}

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
}>;

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
}

 export default Room;