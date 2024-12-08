import { Bodies, Composite, Engine, Render, Runner } from 'matter-js';
import { useEffect, useRef } from 'react';

const WALL_WIDTH = 100;
const WALL_HEIGHT = 100;

export type DOMBody = {
  isActive: boolean;
  x: number;
  y: number;
  angle: number;
};
export function mapPhysicsToDom(domId: string, domBody: DOMBody): React.CSSProperties {
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

function usePhysicsHook(shouldRender = false) {
  // Build the Matter.JS stuff
  const ref = useRef<HTMLDivElement>(null);
  const engine = useRef<Matter.Engine>(Engine.create());
  const runner = useRef<Matter.Runner>(Runner.create());

  // Track all of the DOM bodies that have physics injected into them.

  useEffect(function initObjects() {
    Runner.run(runner.current, engine.current);

    let render: Matter.Render;
    if (shouldRender) {
      render = Render.create({
        element: document.body, // Attach the canvas to the document body
        engine: engine.current,
        options: {
          width: ref.current?.scrollWidth,
          height: ref.current?.scrollHeight,
          background: '#fafafa',
          wireframes: false, // Set to false to render solid shapes
        },
      });
      Render.run(render);
    }

    return () => {
      Runner.stop(runner.current);
      Render.stop(render);
      Composite.clear(engine.current.world, false);
      if (render) {
        render.canvas.remove();
        render.textures = {};
      }
    };
  }, []);

  // Build out the base scene when times tried is greater or equal to 1.
  useEffect(function buildScene() {
    if (!ref.current) return;
    const width = ref.current.scrollWidth;
    const height = ref.current.scrollHeight;

    const ground = Bodies.rectangle(width / 2, height + WALL_HEIGHT / 2, width, WALL_HEIGHT, { isStatic: true });

    const ceiling = Bodies.rectangle(width / 2, 0 - WALL_HEIGHT, width, WALL_HEIGHT, {
      isStatic: true,
    });
    const wallL = Bodies.rectangle(0 - WALL_WIDTH / 2, height / 2, WALL_WIDTH, height, {
      isStatic: true,
    });
    const wallR = Bodies.rectangle(width + WALL_WIDTH / 2, height / 2, WALL_WIDTH, height, {
      isStatic: true,
    });

    Composite.add(engine.current.world, [ground, ceiling, wallL, wallR]);
  }, []);

  // UTIL FUNCTIONS
  function createPhysicsBodyFromDOM(el: HTMLElement, options = {}) {
    const { width, height } = el.getBoundingClientRect();

    const x = el.offsetLeft;
    const y = el.offsetTop;

    // Calculate Matter.js coordinates (centered origin)
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const toRet = Bodies.rectangle(centerX, centerY, width, height, options);
    toRet.friction = 0.0001;
    toRet.frictionAir = 0.00005;
    toRet.restitution = 0.1;

    return toRet;
  }

  return { ref, engine, runner, createPhysicsBodyFromDOM };
}

export default usePhysicsHook;
