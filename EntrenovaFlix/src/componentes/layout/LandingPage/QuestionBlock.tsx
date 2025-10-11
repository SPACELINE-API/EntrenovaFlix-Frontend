import { useFormContext } from 'react-hook-form';

type QuestionBlockProps = {
    name: string;
    question: string;
    options: string[];
};

const QuestionBlock = ({ name, question, options }: QuestionBlockProps) => {
    const { register, formState: { errors } } = useFormContext();

    const optionsWithScores = options.map((optionText, index) => ({
      text: optionText,
      score: (4 - index).toString(), 
    }));
    
    const error = errors[name];

    return (
        <div className={`question-block ${error ? 'has-error' : ''}`}>
            <h4 className="form-label">{question}</h4>
            <div className="radio-group vertical">
                {optionsWithScores.map(({ text, score }) => (
                    <label key={score} htmlFor={`${name}-${score}`}>
                        <input
                          type="radio"
                          id={`${name}-${score}`}
                          value={score}
                          {...register(name)}
                        />
                        {text}
                    </label>
                ))}
            </div>
            {error && <p className="error-message">{error.message?.toString()}</p>}
        </div>
    );
};

export default QuestionBlock;