import '../styles/question.scss';

export const Question = ({content, author}: QuestionProps) => {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
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
}

export default Question;