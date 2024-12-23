import './company-dock.css';
import Temu from '@assets/images/dock/temu.svg';
import Reddit from '@assets/images/dock/reddit.svg';
import Blackrock from '@assets/images/dock/Blackrock.svg';
import Pfizer from '@assets/images/dock/Pfizer.svg';
import Monsanto from '@assets/images/dock/monsanto.svg';
import Nestle from '@assets/images/dock/Nestle.svg';
import BP from '@assets/images/dock/BP.svg';
import Pearson from '@assets/images/dock/Pearson.svg';
import Weinstein from '@assets/images/dock/weinsteinCompany.svg';
import UnitedHealth from '@assets/images/dock/unitedHealthcare.svg';
import AARP from '@assets/images/dock/AARP.svg';
import Palantir from '@assets/images/dock/Palantir.svg';
import Halliburton from '@assets/images/dock/Halliburton.svg';
import Dole from '@assets/images/dock/DOLE.png';

export default function CompanyDock() {
  const logos = [Pearson, Monsanto, Pfizer , Halliburton,  UnitedHealth, Nestle, BP];
  const logos2 = [Dole, Weinstein, Palantir, Temu, Blackrock, Reddit, AARP];

  return (
    <div id="featured" className="featured-dock">
      <div className="dock-list-container">
        <span className="company-list">
          {logos.map((logo) => (
            <img key={crypto.randomUUID()} src={logo} className="logo" />
          ))}
        </span>
        <span className="company-list">
          {logos2.map((logo) => (
            <img key={crypto.randomUUID()} src={logo} className="logo" />
          ))}
        </span>
      </div>
    </div>
  );
}
