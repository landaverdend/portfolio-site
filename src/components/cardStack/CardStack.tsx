import blurredResume from '@assets/images/blurredResume.png';
import coverLetterBlurred from '@assets/images/coverLetterBlurred.png';
import gigachadBlurred from '@assets/images/gigachadBlurred.png';
import './card-stack.css';
import '@styles/fonts.css';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface CardProps {
  src: string;
  hoverText: string;
  isFirst: boolean;
}
function Card(props: CardProps) {
  const { isFirst, hoverText } = props;
  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
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

type CardData = {
  src: string;
  hoverText: string;
};

function CardStack() {
  const [cardOrder, setCardOrder] = useState<Array<CardData>>([
    { src: blurredResume, hoverText: 'Pay as you go access to my resume!' },
    { src: coverLetterBlurred, hoverText: 'Access to customized cover letters' },
    { src: gigachadBlurred, hoverText: 'Access to headshots' },
  ]);

  const handleLeft = () => {
    const bottom = cardOrder.pop() as CardData;
    const tmp = [bottom, ...cardOrder];

    setCardOrder(tmp);
  };

  const handleRight = () => {
    const card = cardOrder.shift() as CardData;
    const tmp = [...cardOrder, card];

    setCardOrder(tmp);
  };

  return (
    <div className="cardstack">
      <div className="cardstack__container">
        {cardOrder.map((c, ind) => (
          <Card key={c.src} isFirst={ind === 0} hoverText={c.hoverText} src={c.src} />
        ))}
      </div>
      <div className="cardstack__controls">
        <span className="cardstack__control cardstack__control--left">
          <i className="fas fa-chevron-left" onClick={handleLeft}></i>
        </span>
        <span className="cardstack__control cardstack__control--right">
          <i className="fas fa-chevron-right" onClick={handleRight}></i>
        </span>
      </div>
    </div>
  );
}

export default CardStack;
