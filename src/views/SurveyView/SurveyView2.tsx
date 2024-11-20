import './survey-view2.css';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import usePhysicsHook from './physicsHook';
import { Body, Composite } from 'matter-js';

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

function randomChance(l: number, r: number) {
  return Math.floor(Math.random() * r) + l;
}

type IWProps = {
  id: string;
  labelText: string;
  placeholder?: string;
  domBody?: DOMBody;
  physicsTrigger: Function;
};
function InputWithPhysics({ id, labelText, placeholder, physicsTrigger, domBody }: IWProps) {
  function mapPhysicsToDom(domId: string): React.CSSProperties {
    if (!domBody?.isActive) return {};
    const el = document.getElementById(domId);

    if (el && domBody) {
      const { x, y, angle } = domBody;
      return {
        position: 'absolute',
        top: y,
        left: x,
        transform: `translate(-50%, -50%) rotate(${angle}rad)`,
      };
    }
    return {};
  }

  return (
    <label>
      {labelText}
      <input
        id={id}
        className="physics"
        type="text"
        placeholder={placeholder}
        style={mapPhysicsToDom(id)}
        onChange={() => physicsTrigger()}
      />
      {domBody?.isActive && <input style={{ visibility: 'hidden' }} />}
    </label>
  );
}

type SWProps = {
  id: string;
  domBody?: DOMBody;
  query: string;
  options: string[];
};
function SelectWithPhysics({ id, domBody, query, options }: SWProps) {
  function mapPhysicsToDom(domId: string): React.CSSProperties {
    if (!domBody?.isActive) return {};
    const el = document.getElementById(domId);

    if (el && domBody) {
      const { x, y, angle } = domBody;
      return {
        position: 'absolute',
        top: y,
        left: x,
        transform: `translate(-50%, -50%) rotate(${angle}rad)`,
      };
    }
    return {};
  }

  return (
    <label>
      {query}
      <select id={id} className="physics" style={mapPhysicsToDom(id)}>
        {options.map((opt) => (
          <option>{opt}</option>
        ))}
      </select>
    </label>
  );
}

type DOMBody = {
  isActive: boolean;
  x: number;
  y: number;
  angle: number;
};
function SurveyView2() {
  const { ref, engine, createPhysicsBodyFromDOM } = usePhysicsHook();
  const domMap = useRef<Map<string, DOMBody>>(new Map());

  const [physicsTrigger, setPhysicsTrigger] = useState(false);
  const [triggerExplosion, setTriggerExplosion] = useState(false);
  const [dumbSlogan, setDumbSlogan] = useState(dumbSlogans[0]);
  const [, setAnim] = useState(0);

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
    function applyExplosionToInputs() {
      if (!triggerExplosion) return;

      // alert('Uh oh')
      const elements = document.getElementsByClassName('physics');

      let i = 0;
      for (let el of elements) {
        if (el) {
          const bodyToAdd = createPhysicsBodyFromDOM(el as HTMLElement, { isStatic: false, plugin: { domId: el.id } });
          bodyToAdd.friction = 0.00001;
          bodyToAdd.frictionAir = 0.000005;
          bodyToAdd.restitution = 0.85;

          // For an 'explosion' effect.
          const force = i % 2 == 0 ? 0.7 : -0.7;
          Body.applyForce(bodyToAdd, bodyToAdd.position, { x: force, y: force });
          Composite.add(engine.current.world, bodyToAdd);
          domMap.current.set(el.id, { isActive: true, x: bodyToAdd.position.x, y: bodyToAdd.position.y, angle: bodyToAdd.angle });

          i++;
        }
      }
    },
    [triggerExplosion]
  );

  useEffect(function triggerAnimation() {
    let unsub: number;

    function animate() {
      for (const el of Composite.allBodies(engine.current.world)) {
        const isActive = domMap.current.get(el.plugin.domId)?.isActive;
        if (el.isStatic || !el.plugin.domId || !isActive) continue;

        domMap.current.set(el.plugin.domId, { isActive: isActive, x: el.position.x, y: el.position.y, angle: el.angle });
      }

      setAnim((x) => x + 1);
      unsub = requestAnimationFrame(animate);
    }

    unsub = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(unsub);
    };
  }, []);

  function triggerPhysics(id: string) {
    if (randomChance(0, 50) === 0) {
      const el = document.getElementById(id);

      const bodyToAdd = createPhysicsBodyFromDOM(el as HTMLElement, { isStatic: false, plugin: { domId: id } });
      bodyToAdd.friction = 0.00001;
      bodyToAdd.frictionAir = 0.000005;
      bodyToAdd.restitution = 0.75;

      Composite.add(engine.current.world, bodyToAdd);

      if (el) {
        domMap.current.set(id, { isActive: true, x: el.offsetLeft, y: el.offsetHeight, angle: bodyToAdd.angle });
      }
      setTimeout(() => {
        alert('Shit!');
        setTriggerExplosion(true);
      }, 2000);
    }
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
                <InputWithPhysics
                  id={'firstName'}
                  labelText={'First Name'}
                  placeholder={'John'}
                  physicsTrigger={() => triggerPhysics('firstName')}
                  domBody={domMap.current.get('firstName')}
                />

                <InputWithPhysics
                  id={'lastName'}
                  labelText={'Last Name'}
                  placeholder={'Doe'}
                  physicsTrigger={() => triggerPhysics('lastName')}
                  domBody={domMap.current.get('lastName')}
                />

                <div className="user-details">
                  <InputWithPhysics
                    id={'email'}
                    domBody={domMap.current.get('email')}
                    labelText={'Work Email'}
                    placeholder={'email@asdf.com'}
                    physicsTrigger={() => triggerPhysics('email')}
                  />

                  <InputWithPhysics
                    id={'job'}
                    domBody={domMap.current.get('job')}
                    labelText={'Job Title'}
                    placeholder={'unemployed'}
                    physicsTrigger={() => triggerPhysics('job')}
                  />

                  <InputWithPhysics
                    id={'phone'}
                    domBody={domMap.current.get('phone')}
                    labelText={'Phone Number'}
                    placeholder={'(123) 456 7891'}
                    physicsTrigger={() => triggerPhysics('phone')}
                  />
                </div>

                <SelectWithPhysics
                  id="companySize"
                  domBody={domMap.current.get('companySize')}
                  query={'Company Size'}
                  options={['1-99 employees', '100-299 employees', '300-1999 employees', '2000+ employees', 'I have no company']}
                />

                <SelectWithPhysics
                  id="hispanic"
                  domBody={domMap.current.get('hispanic')}
                  query={'Are you of Hispanic or Latino descent?'}
                  options={['Yes', 'No']}
                />

                <div className="button-container">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setTriggerExplosion(true);
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
