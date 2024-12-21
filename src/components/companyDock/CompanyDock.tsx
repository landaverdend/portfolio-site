import './company-dock.css';
import Nyt from '@assets/images/dock/NYT.svg?react';
import Meta from '@assets/images/dock/meta.svg?react';
import Google from '@assets/images/dock/google.svg?react';
import Reddit from '@assets/images/dock/reddit.svg?react';
import Salesforce from '@assets/images/dock/salesforce.svg?react';
import YCombinator from '@assets/images/dock/ycombinator.svg?react';

export default function CompanyDock() {
  const logos = [Nyt, Meta, Google, Reddit, Salesforce, YCombinator];

  return (
    <div id="featured" className="featured-dock">
      <b>AS FEATURED IN</b>

      <div className="dock-list-container">
        <ul className="dock-list">
          {logos.map((Logo) => {
            return (
              <span>
                <Logo key={crypto.randomUUID()} className="logo" />
              </span>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
