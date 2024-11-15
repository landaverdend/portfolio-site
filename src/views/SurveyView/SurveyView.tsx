import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import Footer from '@/components/footer/Footer';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import SetupForm from './SetupForm/SetupForm';
import { Bodies, Composite, Engine, Runner } from 'matter-js';
import './survey-view.css';

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

function SurveyView() {
  const [dumbSlogan, setDumbSlogan] = useState(dumbSlogans[0]);

  useEffect(() => {
    const pickDumbSlogan = setInterval(() => {
      const ind = Math.floor(Math.random() * dumbSlogans.length);

      setDumbSlogan(dumbSlogans[ind]);
    }, 10000);

    return () => {
      clearInterval(pickDumbSlogan);
    };
  }, []);

  // Build the Matter.JS stuff
  const ref = useRef<HTMLDivElement>(null);
  const engine = useRef<Matter.Engine>(Engine.create());
  const runner = useRef<Matter.Runner>(Runner.create());
  const [, setAnim] = useState(0);
  const dots = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    Runner.run(runner.current, engine.current);
  }, []);

  // Build out the base scene when times tried is greater or equal to 1.
  useEffect(function init() {
    // if (timesTried >= 1) {
    const width = ref.current?.clientWidth ?? 0;
    const height = ref.current?.clientHeight ?? 0;

    const ground = Bodies.rectangle(width / 2, height, width, 50, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, 0, width, 1, {
      isStatic: true,
    });
    const wallL = Bodies.rectangle(0, height / 2, 1, height, {
      isStatic: true,
    });
    const wallR = Bodies.rectangle(width, height / 2, 50, height, {
      isStatic: true,
    });

    Composite.add(engine.current.world, [ground, ceiling, wallL, wallR]);
    // }
  }, []);

  useEffect(() => {
    let unsubscribe: any;

    function addElement() {
      const width = ref.current?.clientWidth ?? 0;
      const height = ref.current?.clientHeight ?? 0;

      const circ = Bodies.circle(Math.random() * width * 0.75 + 50, Math.random() * height * 0.75 + 50, 25);
      circ.friction = 0.05;
      circ.frictionAir = 0.00005;
      circ.restitution = 0.9;

      Composite.add(engine.current.world, circ);

      // console.log(dots);
      // if (dots.current.length < 100) setTimeout(addElement, 300);
    }

    addElement();

    return () => {
      clearTimeout(unsubscribe);
    };
  }, []);

  useEffect(function triggerAnimation() {
    let unsubscribe: number;
    function animate() {
      let i = 0;
      for (const el of Composite.allBodies(engine.current.world)) {
        if (el.isStatic) continue;

        dots.current[i] = { x: el.position.x, y: el.position.y };

        i++;
      }
      setAnim((x) => x + 1);
      unsubscribe = requestAnimationFrame(animate);
    }

    unsubscribe = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(unsubscribe);
    };
  }, []);

  return (
    <>
      <div className="setup-container">
        {dots.current.map((dot, key) => {
          return (
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '50%',
                position: 'absolute',
                top: dot.y,
                left: dot.x,
                width: '50px',
                height: '50px',
                zIndex: 10000,
              }}
              key={key}></div>
          );
        })}

        <div className="init-block su-fade-in">
          <div className="init-block__info">
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

          <SetupForm />
        </div>

        {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
        {createPortal(
          <>
            <div ref={ref} style={{ height: '100vh', width: '100vw', position: 'absolute' }}></div>
            <BackgroundCanvas flipped={true} />
          </>,
          document.getElementById('root') as HTMLElement
        )}
      </div>
      <Footer />
    </>
  );
}

export default SurveyView;
