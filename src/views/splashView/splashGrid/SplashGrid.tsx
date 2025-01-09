import { useEffect, useState } from 'react';
import './splash-grid.css';
import { randomNumber } from '@/util/random';
import laptop from '@assets/images/splash-page/grid/laptop.jpg';
import gigachad from '@assets/images/splash-page/grid/gigachadBlurred.png';
import coverLetterBlurred from '@assets/images/splash-page/grid/coverLetterBlurred.png';
import monkey from '@assets/images/splash-page/grid/monkey.png';
import handshake from '@assets/images/splash-page/grid/handshake.png';
import tree from '@assets/images/splash-page/grid/tree.png';

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

type TileProps = { front: React.ReactNode; back?: React.ReactNode };
function Tile({ front, back }: TileProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = randomNumber(3000, 6000);
    const func = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, interval);

    return () => {
      clearInterval(func);
    };
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
        <Tile front={<TextTile>Innovative</TextTile>} back={<TextTile>Bold</TextTile>} />
      </div>
      <div className="grid-item text-column double-block metric-block1">
        <span className="giga-text">99%</span> <span>RESUME UPTIME</span>
      </div>
      <div className="grid-item">
        <Tile front={<TextTile>AGILE</TextTile>} back={<TextTile>Scalable</TextTile>} />
      </div>
      <div className="grid-item">
        <ImageTile src={gigachad} text={'Headshots'} />
      </div>
      <div className="grid-item">
        <ImageTile src={laptop} text={'I am black™'} color="black" />
      </div>
      <div className="grid-item">
        <Tile front={<TextTile>FUCK</TextTile>} back={<TextTile>NIGGA</TextTile>} />
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
        <Tile front={<TextTile>POOP</TextTile>} back={<TextTile>BALLS</TextTile>} />
      </div>
      <div className="grid-item">
        <ImageTile src={monkey} text={'AI Driven™'} />
      </div>
      <div className="grid-item">
        <ImageTile src={handshake} text={'Leveraging Synergy'} color={'black'} />
      </div>
      <div className="grid-item">
        <Tile front={<TextTile>YOU ARE</TextTile>} back={<TextTile>FEMININE</TextTile>} />
      </div>
      <div className="grid-item">
        <ImageTile src={tree} text={'Framjam Growth'} color="" />
      </div>
      <div className="grid-item">
        <Tile front={<TextTile>YOU ARE</TextTile>} back={<TextTile>GAY</TextTile>} />
      </div>
    </div>
  );
}
