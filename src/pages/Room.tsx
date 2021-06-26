import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import '../styles/room.scss';

export const Room = () => {
    const params = useParams<RoomParams>();

     return (
         <div id="page-room">
             <header>
                 <div className="content">
                     <strong>Quest.io</strong>
                     <RoomCode code={params.id}/>
                 </div>
             </header>

             <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea
                    placeholder="Faça sua pergunta aqui"/>
                    <div className="form-footer">
                        <span>Para enviar uma pergunta,
                            <button>faça seu login</button>
                        </span>
                        <Button type="submit">Enviar Pergunta</Button>
                    </div>
                </form>
             </main>
         </div>
     )
}

type RoomParams = {
    id: string;
}

 export default Room;