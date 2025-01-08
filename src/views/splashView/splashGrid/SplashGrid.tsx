import './splash-grid.css';
import coverLetterBlurred from '@assets/images/splash-page/coverLetterBlurred.png';

type TileProps = { front: React.ReactNode; back: React.ReactNode };
function Tile({ front, back }: TileProps) {
  return (
    <div className="tile">
      <div>{front}</div>
      <div>{back}</div>
    </div>
  );
}

export default function SplashGrid() {
  return (
    <div className="splash-grid">
      <div className="grid-item">
        <img src={coverLetterBlurred} height={200} width={200}></img>
        <Tile front={<span></span>} back={<span></span>} />
      </div>
      <div className="grid-item">
        <b>INNNOVATIVE</b>
      </div>
      <div className="grid-item text-column">99% RESUME UPTIME</div>
      <div className="grid-item">AGILE/SCALABLE/EFFICIENCY</div>
      <div className="grid-item">HEADSHOTS</div>
      <div className="grid-item">6</div>
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
