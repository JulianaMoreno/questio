
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from './Question';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';

export const AdminRoom = () => {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { roomName, questions } = useRoom(roomId);

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
                            author={question.author}/>
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