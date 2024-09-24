import './setup-form.css';

type Question = {
  question: string;
  answers: string[];
};

const questions: Array<Question> = [
  {
    question: 'What feature are you most interested in?',
    answers: ['Monthly Premium access to my Resume Suite+', 'A personalized Cover Letter?', 'Spy on me?', 'Other'],
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
