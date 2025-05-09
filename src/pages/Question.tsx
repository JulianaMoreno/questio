import { ReactNode } from 'react';
import '../styles/question.scss';

export const Question = ({
    content,
    author,
    children,
    isAnswered=false,
    isHighlighted=false
}: QuestionProps) => {
    return (
        <div
            className={
                `question
                ${isAnswered?'answered':''}
                ${isHighlighted && !isAnswered ?'highlighted':''}`
            }
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div className="child-info">
                    { children }
                </div>
            </footer>
        </div>
    )

};

type QuestionProps = {
    content : string;
    author: {
        name: string,
        avatar: string,
    };
    children?: ReactNode;
    isAnswered?: boolean,
    isHighlighted?: boolean,
}

export default Question;