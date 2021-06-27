import {useState, useEffect} from 'react';
import {database} from '../services/firebase';
import { useAuth } from './useAuth';

export const useRoom = (roomId: string) => {
    const { user } = useAuth();
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
                        likeCount: Object.values(value.likes ?? {}).length,
                        likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0], //verificando se o autor do like é o usuario logado
                    }
                });

            setRoomName(databaseRoom.name);
            setQuestions(parsedQuestions);
        });

        // remove todos os eventos de listeners dessa referencia de sala (value)
        return () => {
            roomRef.off('value');
        };

    }, [roomId, user?.id]);

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
    likeCount: number;
    likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>;

export default useRoom;