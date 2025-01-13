import './about-container.css';
import me from '@assets/images/resume/me.png';

function AboutContainer() {
  return (
    <>
      <div id="about" className="about-container">
        <div className="text-container__text">
          <h2>About Me</h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
          aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          <div className="social-dock">
            <div className="social-header">
              <hr />
              <h3>Socials</h3>
              <hr />
            </div>
          </div>
        </div>
        <img src={me} />
      </div>
    </>
  );
}

export default AboutContainer;
