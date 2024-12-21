import './company-dock.css';
import Nyt from '@assets/images/dock/NYT.svg';
import Meta from '@assets/images/dock/meta.svg';
import Google from '@assets/images/dock/google.svg';
import Temu from '@assets/images/dock/temu.svg';
import Github from '@assets/images/dock/github.svg';
import Amzn from '@assets/images/dock/AMZN.svg';
import Msft from '@assets/images/dock/MSFT.svg';
import Forbes from '@assets/images/dock/forbes.svg';
import Pfizer from '@assets/images/dock/Pfizer.svg';
import Monsanto from '@assets/images/dock/monsanto.svg';
import Nestle from '@assets/images/dock/Nestle.svg';
import BP from '@assets/images/dock/BP.svg';
import Pearson from '@assets/images/dock/Pearson.svg';

export default function CompanyDock() {
  const logos = [Pfizer, Monsanto, Pearson, Nyt, Nestle, BP];
  const logos2 = [Temu, Github, Amzn, Msft, Forbes, Meta];

  return (
    <div id="featured" className="featured-dock">
      <h2>AS FEATURED IN</h2>

      <div className="dock-list-container">
        <ul>
          {logos.map((logo) => (
            <img id={crypto.randomUUID()} src={logo} className="logo" />
          ))}
        </ul>
        <ul>
          {logos2.map((logo) => (
            <img id={crypto.randomUUID()} src={logo} className="logo" />
          ))}
        </ul>
      </div>
    </div>
  );
}
