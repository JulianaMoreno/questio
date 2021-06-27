import {useState, useEffect} from 'react';
import {database} from '../services/firebase';

export const useRoom = (roomId: string) => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
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
            setQuestions(parsedQuestions);
        })
    }, [roomId]);

    return {roomName, questions};

}

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
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

export default useRoom;