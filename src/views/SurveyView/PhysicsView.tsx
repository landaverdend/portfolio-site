import { Bodies, Composite, Engine, Runner } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
import usePhysicsHook from './physicsHook';
import './physicsView.css';

type Coordinates = {
  x: number;
  y: number;
  angle: number;
};

function PhysicsView() {
  const [physicsEnabled, setPhysicsEnabled] = useState(false);

  const { engine, ref } = usePhysicsHook(true);
  const [, setAnim] = useState(0);

  const map = useRef<Map<string, Coordinates>>(new Map());

  function createPhysicsBodyFromDOM(el: HTMLElement, options = {}) {
    const { x, y, width, height } = el.getBoundingClientRect();

    // Calculate Matter.js coordinates (centered origin)
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    return Bodies.rectangle(centerX, centerY, width, height, options);
  }

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

      function animate() {
        for (const el of Composite.allBodies(engine.current.world)) {
          if (el.isStatic || !el.plugin.domId) continue;
          map.current.set(el.plugin.domId, { x: el.position.x, y: el.position.y, angle: el.angle });
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
    const coords = map.current.get(domId);
    const el = document.getElementById(domId);

    if (el && coords) {
      const { x, y, angle } = coords;

      return { position: 'absolute', top: y, left: x, transform: `translate(-50%, -50%) rotate(${angle}rad)` };
    }
    return {};
  }

  return (
    <div className="physics-container" ref={ref}>
      <div className="input-container">
        <input id="test" type="text" style={physicsEnabled ? mapPhysicsToDom('test') : {}} />
        <input id="test1" type="text" style={physicsEnabled ? mapPhysicsToDom('test1') : {}} />
        <button onClick={() => setPhysicsEnabled(true)}>Turn On Physics</button>
      </div>

      <span style={{ height: '100vh', backgroundColor: 'red' }}>here</span>
    </div>
  );
}

export default PhysicsView;
