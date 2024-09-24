import './setup-form.css';

type Question = {
  question: string;
  answers: string[];
};

const questions: Array<Question> = [
  {
    question: 'Pee pee poo poo?',
    answers: ['pee 1', 'pee 2', 'pee 3', 'pee 4'],
  },
];

function QuestionComponent({ question }: { question: Question }) {
  return <div className="question-container">{question.question}</div>;
}

function SetupForm() {
  return (
    <div className="form-container q-fade-in">
      {questions.map((q) => (
        <QuestionComponent question={q} />
      ))}
    </div>
  );
}

export default SetupForm;
