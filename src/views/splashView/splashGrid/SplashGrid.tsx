import { useEffect, useState } from 'react';
import './splash-grid.css';
import { randomNumber } from '@/util/random';
import laptop from '@assets/images/splash-page/grid/laptop.jpg';
import gigachad from '@assets/images/splash-page/grid/gigachadBlurred.png';
import coverLetterBlurred from '@assets/images/splash-page/grid/coverLetterBlurred.png';
import monkey from '@assets/images/splash-page/grid/monkey.png';
import handshake from '@assets/images/splash-page/grid/handshake.png';
import tree from '@assets/images/splash-page/grid/tree.png';

const FONTS = [
  'Montserrat',
  // 'Arial',
  'Roboto',
  'Shippori_Mincho',
  'Doto',
];

type ITProps = {
  src: string;
  text: string;
  color?: string;
};
function ImageTile({ src, text, color }: ITProps) {
  return (
    <span className="image-tile-container">
      <img src={src} height={210} width={210}></img>
      <span className="image-tile-text" style={{ color: color ? color : '' }}>
        {text}
      </span>
    </span>
  );
}

type TileProps = { front: React.ReactNode; back?: React.ReactNode };
function Tile({ front, back }: TileProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontIndex, setFrontIndex] = useState(randomNumber(0, FONTS.length));
  const [backIndex, setBackIndex] = useState(randomNumber(0, FONTS.length));

  useEffect(() => {
    const interval = randomNumber(3000, 6000);

    const func = setInterval(() => {
      setIsFlipped((prev) => !prev);

      if (isFlipped) {
        setBackIndex((prev) => (prev + 1 === FONTS.length ? 0 : prev + 1));
      } else {
        setFrontIndex((prev) => (prev + 1 === FONTS.length ? 0 : prev + 1));
      }
    }, interval);

    return () => {
      clearInterval(func);
    };
  }, []);

  return (
    <div className={`tile-container ${isFlipped ? 'flip-anim' : ''}`}>
      <div className={'tile-front tile-text'} style={{ fontFamily: FONTS[frontIndex] }}>
        {front}
      </div>
      <div className="tile-back tile-text" style={{ fontFamily: FONTS[backIndex] }}>
        {back}
      </div>
    </div>
  );
}

export default function SplashGrid() {
  return (
    <div className="splash-grid">
      <div className="grid-item">
        <ImageTile src={coverLetterBlurred} text={'Cover Letters'}></ImageTile>
      </div>
      <div className="grid-item">
        <Tile front={<>Innovate</>} back={<>Bold</>} />
      </div>
      <div className="grid-item text-column double-block metric-block1">
        <span className="giga-text">99%</span> <span>RESUME UPTIME</span>
      </div>
      <div className="grid-item">
        <Tile front={<>Agile</>} back={<>Scalable</>} />
      </div>
      <div className="grid-item">
        <ImageTile src={gigachad} text={'Headshots'} />
      </div>
      <div className="grid-item">
        <ImageTile src={laptop} text={'This is me™'} color="black" />
      </div>
      <div className="grid-item">
        <Tile front={<>Pointless</>} back={<>Yikes</>} />
      </div>
      <div className="grid-item text-column double-block metric-block2">
        Real-Time Resume Analytics (RTRA)
        <ul>
          <li>
            Provides recruiters with live metrics: time spent unemployed, skill endorsement velocity, and buzzword
            density.
          </li>
        </ul>
      </div>
      <div className="grid-item">
        <Tile front={<>POOP</>} back={<>BALLS</>} />
      </div>
      <div className="grid-item">
        <ImageTile src={monkey} text={'AI Driven™'} />
      </div>
      <div className="grid-item">
        <ImageTile src={handshake} text={'Leveraging Synergy'} />
      </div>
      <div className="grid-item">
        <Tile front={<>RaaS</>} back={<>KPI</>} />
      </div>
      <div className="grid-item">
        <ImageTile src={tree} text={'Framjam Growth'} color="" />
      </div>
      <div className="grid-item">
        <Tile front={<>Achieve</>} back={<>Synergize</>} />
      </div>
    </div>
  );
}
