import { useFormContext } from 'react-hook-form';

type QuestionBlockProps = {
    name: string;
    question: string;
    options: string[];
};

const QuestionBlock = ({ name, question, options }: QuestionBlockProps) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name];

    return (
        <div className={`question-block ${error ? 'has-error' : ''}`}>
            <h4 className="form-label">{question}</h4>
            <div className="radio-group vertical">
                {options.map((option, index) => (
                    <label key={index}>
                        <input type="radio" value={`opcao${index + 1}`} {...register(name)} /> {option}
                    </label>
                ))}
            </div>
            {error && <p className="error">{error.message?.toString()}</p>}
        </div>
    );
};

export default QuestionBlock;