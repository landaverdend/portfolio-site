import { useEffect, useState } from 'react';
import './splash-grid.css';
import coverLetterBlurred from '@assets/images/splash-page/coverLetterBlurred.png';
import gigachad from '@assets/images/splash-page/gigachadBlurred.png';
import { randomNumber } from '@/util/random';

type TTProps = {
  children: React.ReactNode;
};
function TextTile({ children }: TTProps) {
  return <span className="tile-text">{children}</span>;
}

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

type TileProps = { front: React.ReactNode; back?: React.ReactNode; isFlipEnabled?: boolean };
function Tile({ front, back, isFlipEnabled }: TileProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isFlipEnabled) {
      const interval = randomNumber(3000, 6000);
      const func = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, interval);

      return () => {
        clearInterval(func);
      };
    }
  }, []);

  return (
    <div className={`tile-container ${isFlipped ? 'flip-anim' : ''}`}>
      <div className={'tile-front'}>{front}</div>
      <div className="tile-back ">{back}</div>
    </div>
  );
}

export default function SplashGrid() {
  return (
    <div className="splash-grid">
      <div className="grid-item">
        <ImageTile src={coverLetterBlurred} text={'Cover Letters'} color={'black'}></ImageTile>
      </div>
      <div className="grid-item">
        <Tile isFlipEnabled={true} front={<TextTile>Innovative</TextTile>} back={<TextTile>Bold</TextTile>} />
      </div>
      <div className="grid-item text-column metric-block1">
        <span className="giga-text">99%</span> <span>RESUME UPTIME</span>
      </div>
      <div className="grid-item">AGILE/SCALABLE/EFFICIENCY</div>
      <div className="grid-item">
        <ImageTile src={gigachad} text={'Headshots'} />
      </div>
      <div className="grid-item">
        <Tile front={<TextTile>AGILE</TextTile>} />
      </div>
      <div className="grid-item">7</div>
      <div className="grid-item text-column">
        Real-Time Resume Analytics (RTRA)
        <ul>
          <li>
            Provides recruiters with live metrics: time spent unemployed, skill endorsement velocity, and buzzword
            density.
          </li>
        </ul>
      </div>
      <div className="grid-item">9</div>
      <div className="grid-item">10</div>
      <div className="grid-item">11</div>
      <div className="grid-item">12</div>
      <div className="grid-item">13</div>
      <div className="grid-item">14</div>
    </div>
  );
}
