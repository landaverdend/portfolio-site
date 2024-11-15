import { Bodies, Composite, Engine, Runner } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
// import styled from "styled-components";


interface Circle {
  x: number;
  y: number;
}

function PhysicsView() {
  const ref = useRef<HTMLDivElement>(null);
  const engine = useRef<Matter.Engine>(Engine.create())
  const runner = useRef<Matter.Runner>(Runner.create())
  const dots = useRef<Circle[]>([]);
  const [, setAnim] = useState(0);

  useEffect(() => {
    Runner.run(runner.current, engine.current)
  }, [])

  useEffect(function init() {
    const width = ref.current?.clientWidth ?? 0;
    const height = ref.current?.clientHeight ?? 0;

    const ground = Bodies.rectangle(width / 2, height, width, 50, {
      isStatic: true,
    });
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
  }, []);

  useEffect(() => {
    let unsubscribe: any;

    function addDot() {
      const width = ref.current?.clientWidth ?? 0;
      const height = ref.current?.clientHeight ?? 0;

      const circ = Bodies.circle(Math.random() * width * 0.75 + 50, Math.random() * height * 0.75 + 50, 25);
      circ.friction = 0.05;
      circ.frictionAir = 0.00005;
      circ.restitution = 0.9;

      Composite.add(engine.current.world, circ);

      if (dots.current.length < 100) setTimeout(addDot, 300);
    }

    addDot();

    return () => {
      clearTimeout(unsubscribe);
    };
  }, []);

  useEffect(function triggerAnimation() {
    let unsubscribe: number;

    function animate() {
      let i = 0;
      console.log(dots);
      for (const dot of Composite.allBodies(engine.current.world)) {
        if (dot.isStatic) continue;

        dots.current[i] = { x: dot.position.x, y: dot.position.y };

        i += 1;
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
    <div ref={ref} style={{ width: '100vw', height: '100vh' }}>
      {dots.current.map((dot, key) => (
        <div
          style={{
            backgroundColor: 'red',
            borderRadius: '50%',
            position: 'absolute',
            top: dot.y,
            left: dot.x,
            width: '50px',
            height: '50px',
          }}
          key={key}></div>
      ))}
    </div>
  );
}

export default PhysicsView;
