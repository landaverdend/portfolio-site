import './company-dock.css';
import Nyt from '@assets/images/dock/NYT.svg';
import Meta from '@assets/images/dock/meta.svg';
import Google from '@assets/images/dock/google.svg';
import Reddit from '@assets/images/dock/reddit.svg';
import Salesforce from '@assets/images/dock/salesforce.svg';
import YCombinator from '@assets/images/dock/ycombinator.svg';
import Temu from '@assets/images/dock/temu.svg';
import Github from '@assets/images/dock/github.svg';
import Amzn from '@assets/images/dock/AMZN.svg';
import Msft from '@assets/images/dock/MSFT.svg';
import Forbes from '@assets/images/dock/forbes.svg';
import Monsanto from '@assets/images/dock/monsanto.svg';

export default function CompanyDock() {
  const logos = [Nyt, Meta, Google, Reddit, Salesforce, YCombinator];
  const logos2 = [Temu, Github, Amzn, Msft, Forbes, Monsanto];

  return (
    <div id="featured" className="featured-dock">
      <h2>AS SEEN IN</h2>

      <div className="dock-list-container">
        <ul>
          {logos.map((logo) => (
            <img src={logo} className="logo" />
          ))}
        </ul>
        <ul>
          {logos2.map((logo) => (
            <img src={logo} className="logo" />
          ))}
        </ul>
      </div>
    </div>
  );
}
