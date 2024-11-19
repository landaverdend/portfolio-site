import './survey-view2.css';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import usePhysicsHook from './physicsHook';
import { Composite } from 'matter-js';

const dumbSlogans: string[] = [
  'Unlocking your path to unparalleled hiring success.',
  'Empowering your recruitment journey with top-tier talent.',
  'Transforming your hiring process, one resume at a time.',
  'Redefining the future of developer recruitment.',
  'Streamlining your talent search with seamless access.',
  'Fueling your hiring success with instant access to greatness.',
  'Revolutionizing the way you discover developer talent.',
  'Accelerating your hiring strategy with exclusive access.',
  'Driving your recruitment success at the speed of innovation.',
  'Shaping the future of talent acquisition, today.',
  "Connecting you to the developer you've been searching for.",
  'Elevating your hiring process to the next level.',
  'Empowering your recruitment with unmatched access to expertise.',
];

type Coordinates = {
  x: number;
  y: number;
  angle: number;
};

function SurveyView2() {
  const [physicsEnabled, setPhysicsEnabled] = useState(false);
  const [dumbSlogan, setDumbSlogan] = useState(dumbSlogans[0]);
  const [, setAnim] = useState(0);

  const { ref, engine, createPhysicsBodyFromDOM } = usePhysicsHook(false);
  const domMap = useRef<Map<string, Coordinates>>(new Map());

  useEffect(() => {
    const pickDumbSlogan = setInterval(() => {
      const ind = Math.floor(Math.random() * dumbSlogans.length);

      setDumbSlogan(dumbSlogans[ind]);
    }, 10000);

    return () => {
      clearInterval(pickDumbSlogan);
    };
  }, []);

  useEffect(
    function addInput() {
      if (!physicsEnabled) return;

      // const inputs = document.getElementsByTagName('input');
      const elements = document.getElementsByClassName('physics');

      for (let el of elements) {
        if (el) {
          const bodyToAdd = createPhysicsBodyFromDOM(el, { plugin: { domId: el.id } });
          bodyToAdd.friction = 0.00001;
          bodyToAdd.frictionAir = 0.000005;
          bodyToAdd.restitution = 1.0;

          Composite.add(engine.current.world, bodyToAdd);
        }
      }
    },
    [physicsEnabled]
  );

  useEffect(
    function triggerAnimation() {
      if (!physicsEnabled) return;

      let unsub: number;

      function animate() {
        for (const el of Composite.allBodies(engine.current.world)) {
          if (el.isStatic || !el.plugin.domId) continue;

          domMap.current.set(el.plugin.domId, { x: el.position.x, y: el.position.y, angle: el.angle });
        }

        setAnim((x) => x + 1);
        unsub = requestAnimationFrame(animate);
      }

      unsub = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(unsub);
      };
    },
    [physicsEnabled]
  );

  function mapPhysicsToDom(domId: string): React.CSSProperties {
    if (!physicsEnabled) return {};
    const coords = domMap.current.get(domId);
    const el = document.getElementById(domId);

    if (el && coords) {
      const { x, y, angle } = coords;

      return { position: 'absolute', top: y, left: x, transform: `translate(-50%, -50%) rotate(${angle}rad)` };
    }
    return {};
  }

  return (
    <>
      <div className="physics-container" ref={ref}>
        <div className="survey-view-container">
          <div className="about-container">
            <h1>
              <TypewriterText text={dumbSlogan} speed={30} delay={0} />
            </h1>
            <p>
              Introducing the revolutionary Resume As A Service <b>(RaaS)</b>—a streamlined, subscription-based way for recruiters
              to view my developer resume on demand. Think of it as your personal shortcut to discovering my experience, skills,
              and project work, minus the hassle. Perfect for recruiters who need quick access, and for teams with long-term
              hiring needs, we’re here to help you get exactly what you’re looking for. Just let us know what you’re aiming for,
              and we’ll make sure you’re all set.
            </p>
          </div>
          <div className="form-container">
            <form className="form">
              <h1>Let's get you started...</h1>
              <div className="input-grid">
                <label>
                  First Name
                  <input id="firstName" className="physics" type="text" placeholder="John" style={mapPhysicsToDom('firstName')} />
                  {physicsEnabled && <input style={{ visibility: 'hidden' }} />}
                </label>

                <label>
                  Last Name
                  <input id="lastName" className="physics" type="text" placeholder="Doe" style={mapPhysicsToDom('lastName')} />
                  {physicsEnabled && <input style={{ visibility: 'hidden' }} />}
                </label>

                <div className="user-details">
                  <label>
                    Work Email
                    <input id="email" className="physics" type="text" placeholder="Email" style={mapPhysicsToDom('email')} />
                    {physicsEnabled && <input style={{ visibility: 'hidden' }} />}
                  </label>

                  <label>
                    Job Title
                    <input
                      id="job"
                      className="physics"
                      type="text"
                      placeholder="Job Title"
                      style={mapPhysicsToDom('job')}></input>
                    {physicsEnabled && <input style={{ visibility: 'hidden' }} />}
                  </label>

                  <label>
                    Phone Number
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(123) 456-7891"
                      className="physics"
                      style={mapPhysicsToDom('phone')}></input>
                    {physicsEnabled && <input style={{ visibility: 'hidden' }} />}
                  </label>
                </div>

                <label>
                  Company Size
                  <select id="companySize" className="physics" style={mapPhysicsToDom('companySize')}>
                    <option>1-99 employees </option>
                    <option>100-299 employees</option>
                    <option>300-1999 employees</option>
                    <option>+2000 employees</option>
                    <option>I have no company</option>
                  </select>
                </label>

                <label>
                  Are you of Hispanic or Latino descent?
                  <select id="hispanic" className="physics" style={mapPhysicsToDom('hispanic')}>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>

                <div className="button-container">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPhysicsEnabled(true);
                    }}>
                    Let's Go!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <BackgroundCanvas flipped={true} />
      </div>
    </>
  );
}

export default SurveyView2;
