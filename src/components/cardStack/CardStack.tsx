import blurredResume from '@assets/images/blurredResume.png';
import coverLetterBlurred from '@assets/images/coverLetterBlurred.png';
import gigachadBlurred from '@assets/images/gigachadBlurred.png';
import './card-stack.css';
import { useState } from 'react';

interface CardProps {
  src: string;
  hoverText: string;
  isFirst: boolean;
  // isActive: boolean;
}
function Card(props: CardProps) {
  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleMouseEnter = () => {
    console.log('Mouse entered the element ' + props.hoverText);
  };

  const handleMouseLeave = () => {
    console.log('Mouse left the element.');
  };

  return (
    <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={props.src} />
    </div>
  );
}

function CardStack() {
  // This could also just be a prop
  const cards = [
    <Card key={blurredResume} src={blurredResume} hoverText={'lol'} isFirst={true}/>,
    <Card key={coverLetterBlurred} src={coverLetterBlurred} hoverText={'lol'} isFirst={false}/>,
    <Card key={gigachadBlurred} src={gigachadBlurred} hoverText={'lol'} isFirst={false} />,
  ];

  return (
    <div>
      <div className="card-stack">{
      cards
      }</div>
    </div>
  );
}

export default CardStack;
