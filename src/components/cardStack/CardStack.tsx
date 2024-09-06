import blurredResume from '@assets/images/blurredResume.png';
import coverLetterBlurred from '@assets/images/coverLetterBlurred.png';
import gigachadBlurred from '@assets/images/gigachadBlurred.png';
import './card-stack.css';
import '@styles/fonts.css';
import { useState } from 'react';

interface CardProps {
  src: string;
  hoverText: string;
  isFirst: boolean;
  // isActive: boolean;
}
function Card(props: CardProps) {
  const { isFirst, hoverText } = props;
  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleMouseEnter = () => {
    setIsActive(true);
    console.log('entered');
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    console.log('left');
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={'card__container ' + (isFirst ? 'card__container--active' : '')}>
      {isActive && isFirst ? <span className="card__text inter">{hoverText}</span> : <></>}

      <img className="card__image" src={props.src} />
    </div>
  );
}

function CardStack() {
  // This could also just be a prop
  const cards = [
    <Card key={blurredResume} src={blurredResume} hoverText={'Pay as you go access to my resume!'} isFirst={true} />,
    <Card key={coverLetterBlurred} src={coverLetterBlurred} hoverText={'Access to customized cover letters'} isFirst={false} />,
    <Card key={gigachadBlurred} src={gigachadBlurred} hoverText={'Headshots!'} isFirst={false} />,
  ];

  return (
    <div className="cardstack">
      <div className="cardstack__container">{cards}</div>
      <div className="cardstack__controls">left and right</div>
    </div>
  );
}

export default CardStack;
