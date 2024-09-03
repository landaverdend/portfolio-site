import blurredResume from '@assets/images/blurred-resume.png';
import './card-stack.css';

interface CardProps {
  src: string;
}
function Card(props: CardProps) {
  return (
    <>
      <img className="card" src={props.src} />
    </>
  );
}

function CardStack() {
  const cards = [<Card key={blurredResume} src={blurredResume} />];

  return (
    <>
      <div className="card-array">{cards}</div>
    </>
  );
}

export default CardStack;
