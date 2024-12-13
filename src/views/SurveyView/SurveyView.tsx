import './survey-view.css';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import usePhysicsHook, { DOMBody } from './physicsHook.tsx';
import { Body, Composite } from 'matter-js';
import { getRandomChanceIn } from '@/util/random';
import FormContainer from './formContainer/FormContainer.tsx';

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

export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companySize: string;
  companyName: string;
  job: string;
  hispanic: string;
  marketingMaterials: boolean;
};
function SurveyView() {
  const { ref, engine, createPhysicsBodyFromDOM } = usePhysicsHook(true);

  const domMap = useRef<Map<string, DOMBody>>(new Map());
  const isPhysicsSequenceStarted = useRef<boolean>(false);

  const [explosionTriggered, setExplosionTriggered] = useState(false);
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
      if (!explosionTriggered) return;

      const elements = document.getElementsByClassName('physics');

      let i = 0;
      for (let el of elements) {
        if (!domMap.current.get(el.id)?.isActive) {
          const bodyToAdd = createPhysicsBodyFromDOM(el as HTMLElement, { isStatic: false, plugin: { domId: el.id } });

          // For an 'explosion' effect.
          const force = i % 2 == 0 ? 0.7 : -0.7;
          Body.applyForce(bodyToAdd, bodyToAdd.position, { x: force, y: force });
          Composite.add(engine.current.world, bodyToAdd);
          domMap.current.set(el.id, { isActive: true, x: bodyToAdd.position.x, y: bodyToAdd.position.y, angle: bodyToAdd.angle });

          i++;
        }
      }
    },
    [explosionTriggered]
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
    if (!isPhysicsSequenceStarted.current && getRandomChanceIn(1)) {
      const el = document.getElementById(id);

      const bodyToAdd = createPhysicsBodyFromDOM(el as HTMLElement, { isStatic: false, plugin: { domId: id } });

      Composite.add(engine.current.world, bodyToAdd);

      if (el) {
        domMap.current.set(id, { isActive: true, x: el.offsetLeft, y: el.offsetHeight, angle: bodyToAdd.angle });
      }

      // Trigger the explosion on all other dom elements after two seconds.
      setTimeout(() => {
        alert('SHIT');
        setExplosionTriggered(true);
      }, 2000);
      isPhysicsSequenceStarted.current = true;
    }
  }

  return (
    <>
      <div className="physics-container" ref={ref}>
        <div className="survey-view-container">
          <div className="survey-description-container">
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

          <FormContainer triggerPhysics={triggerPhysics} domMap={domMap.current} />
        </div>
        <BackgroundCanvas flipped={true} />
      </div>
    </>
  );
}

export default SurveyView;
