import blurredResume from '@assets/images/blurred-resume.png';
import './card-stack.css';

interface CardProps {
  src: string;
}
function Card(props: CardProps) {}

function CardStack() {
  return (
    <>
      <div className="img-array">
        <img id="resume" src={blurredResume} />
      </div>
    </>
  );
}

export default CardStack;
