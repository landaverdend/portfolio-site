import './survey-view2.css';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import usePhysicsHook from './physicsHook';
import { Composite } from 'matter-js';
import Footer from '@/components/footer/Footer';

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

      const inputs = document.getElementsByTagName('input');

      for (let el of inputs) {
        if (el) {
          const bodyToAdd = createPhysicsBodyFromDOM(el, { plugin: { domId: el.id } });
          bodyToAdd.friction = 0.0001;
          bodyToAdd.frictionAir = 0.0005;
          bodyToAdd.restitution = 2;

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
      console.log('is animating.');

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
                <input id="firstName" type="text" style={physicsEnabled ? mapPhysicsToDom('firstName') : {}} />

                <input id="lastName" type="text" style={physicsEnabled ? mapPhysicsToDom('lastName') : {}} />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPhysicsEnabled(true);
                  }}>
                  turn on physics.
                </button>
              </div>
            </form>
          </div>
          <BackgroundCanvas flipped={true} />
        </div>
      </div>
    </>
  );
}

export default SurveyView2;
