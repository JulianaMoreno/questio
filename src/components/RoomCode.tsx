import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

export const RoomCode = (props: RoomCodeProps) => {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
    };

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>{props.code}</span>
        </button>
    )
}

type RoomCodeProps = {
    code: string;
};

export default RoomCode;