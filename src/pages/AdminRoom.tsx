
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from './Question';
import { useRoom } from '../hooks/useRoom';
import deleteIcon from '../assets/images/delete.svg';
import '../styles/room.scss';
import { database } from '../services/firebase';

export const AdminRoom = () => {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { roomName, questions } = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    };

     return (
         <div id="page-room">
             <header>
                 <div className="content">
                     <strong>Quest.io</strong>
                     <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Encerrar sala</Button>
                     </div>
                 </div>
             </header>

             <main>
                <div className="room-title">
                    <h1>{roomName}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                            return (
                                <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}>
                                    <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                        <img src={deleteIcon} alt="Remover pergunta" />
                                    </button>
                                </Question>
                            )
                        })}
                </div>
             </main>
         </div>
     )
};

type RoomParams = {
    id: string;
};

export default AdminRoom;