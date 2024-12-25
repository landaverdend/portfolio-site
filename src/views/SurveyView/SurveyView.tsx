import './survey-view.css';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import usePhysicsHook from '../../hooks/physicsHook.tsx';
import { Body } from 'matter-js';
import { getRandomChanceIn, randomNumber } from '@/util/random';
import FormContainer from './formContainer/FormContainer.tsx';
import { createInputElement, createSelectElement } from '@/util/ElementFactory.ts';

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
  const { ref, domMap, addPhysicsElement } = usePhysicsHook();

  const isPhysicsSequenceStarted = useRef<boolean>(false);

  const [explosionTriggered, setExplosionTriggered] = useState(false);
  const [rainTriggered, setRainTriggered] = useState(false);
  const [dumbSlogan, setDumbSlogan] = useState(dumbSlogans[0]);
  const [isGiveupEnabled, setIsGiveupEnabled] = useState(false);

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

      const elements = document.querySelectorAll<HTMLElement>('.physics');

      let i = 0;
      for (let el of elements) {
        if (!domMap.current.get(el.id)?.isActive) {
          const bodyToAdd = addPhysicsElement(el);

          const force = i % 2 == 0 ? 0.7 : -0.7;
          Body.applyForce(bodyToAdd, bodyToAdd.position, { x: force, y: force });

          i++;
        }
      }
    },
    [explosionTriggered]
  );

  useEffect(
    function beginElementRaining() {
      const elementFactoryMethods = [createInputElement, createSelectElement];

      let numItems = 0;

      if (rainTriggered && numItems < 300) {
        const rainInputInterval = setInterval(() => {
          numItems++;
          const elToAdd = elementFactoryMethods[randomNumber(0, elementFactoryMethods.length)]();
          ref.current?.appendChild(elToAdd);

          addPhysicsElement(elToAdd);
        }, 500);

        return () => {
          clearInterval(rainInputInterval);
        };
      }
    },
    [rainTriggered]
  );

  function triggerPhysics(id: string) {
    if (!isPhysicsSequenceStarted.current && getRandomChanceIn(5)) {
      const el = document.getElementById(id);

      if (el) {
        el.style.zIndex = '190';
        addPhysicsElement(el);
      }

      // Set various event triggers
      setTimeout(() => {
        setExplosionTriggered(true);
      }, 2000);

      setTimeout(() => {
        setRainTriggered(true);
      }, 3000);

      setTimeout(() => {
        setIsGiveupEnabled(true);
      }, 5000);

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

          <FormContainer triggerPhysics={triggerPhysics} domMap={domMap.current} isGiveupEnabled={isGiveupEnabled} />
        </div>
        <BackgroundCanvas flipped={true} position="fixed" />
      </div>
    </>
  );
}

export default SurveyView;
