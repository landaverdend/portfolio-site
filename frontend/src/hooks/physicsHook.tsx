import { createDebugCanvas } from '@/util/ElementFactory';
import { Bodies, Composite, Engine, Render, Runner } from 'matter-js';
import { useEffect, useRef, useState } from 'react';

const WALL_WIDTH = 100;
const WALL_HEIGHT = 100;

export type DOMBody = {
  isActive: boolean;
  x: number;
  y: number;
  angle: number;
  width: number; // Width needs to be tracked due to the
};

function usePhysicsHook(shouldRender = false) {
  const [, setAnim] = useState(0);

  // Build the Matter.JS stuff
  const ref = useRef<HTMLDivElement>(null);
  const engine = useRef<Matter.Engine>(Engine.create());
  const runner = useRef<Matter.Runner>(Runner.create());

  // Track all of the DOM bodies that have physics injected into them.
  const domMap = useRef<Map<string, DOMBody>>(new Map());

  useEffect(function fillDomMap() {
    const elements = document.querySelectorAll<HTMLElement>('.physics');

    for (const el of elements) {
      const { x, y } = el.getBoundingClientRect();
      domMap.current.set(el.id, { isActive: false, x: x, y: y, angle: 0, width: el.offsetWidth });
    }
  }, []);

  useEffect(function initObjects() {
    Runner.run(runner.current, engine.current);

    let render: Matter.Render;
    if (shouldRender) {
      const debugCanvas = createDebugCanvas();
      document.body.appendChild(debugCanvas);

      render = Render.create({
        element: debugCanvas,
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

    buildScene();

    return () => {
      Runner.stop(runner.current);
      Composite.clear(engine.current.world, false);
      if (render) {
        Render.stop(render);
        render.canvas.remove();
        render.textures = {};
      }
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (!ref.current) return;

      // const width = ref.current.scrollWidth;
      // const height = ref.current.scrollHeight;

      // // Update Matter.js render dimensions
      // engine.current.world.bounds.max.x = width;
      // engine.current.world.bounds.max.y = height;

      buildScene();
    }

    // // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function buildScene() {
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
  }

  useEffect(function triggerAnimation() {
    let unsub: number;

    function animate() {
      const dom = domMap.current;

      for (const body of Composite.allBodies(engine.current.world)) {
        const isActive = dom.get(body.plugin.domId)?.isActive;
        const { isStatic, plugin } = body;

        // Skip updating the element coordinates if it is: static, not in the map, inactive.
        if (isStatic || !plugin.domId || !isActive) continue;

        const { x, y } = body.position;
        const { angle } = body;

        dom.set(body.plugin.domId, { isActive: isActive, x: x, y: y, angle: body.angle, width: body.plugin.width });

        // UPDATE THE dom object with data from matterjs.
        const el = document.getElementById(plugin.domId);
        if (el) {
          el.style.position = 'absolute';
          el.style.top = `${y}px`;
          el.style.left = `${x}px`;
          el.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
          el.style.width = `${plugin.width - 25}px`;
          // el.style.padding = `12px`
        }
      }

      setAnim((prev) => prev + 1);

      unsub = requestAnimationFrame(animate);
    }

    unsub = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(unsub);
    };
  }, []);

  // UTIL FUNCTIONS
  function createPhysicsBodyFromDOM(el: HTMLElement, options = {}) {
    const x = el.offsetLeft;
    const y = el.offsetTop;

    // Calculate Matter.js coordinates (centered origin)
    const centerX = x + el.offsetWidth / 2;
    const centerY = y + el.offsetHeight / 2;

    const toRet = Bodies.rectangle(centerX, centerY, el.offsetWidth, el.offsetHeight, options);
    toRet.friction = 0.0001;
    toRet.frictionAir = 0.00005;
    toRet.restitution = 0.1;

    return toRet;
  }

  function addPhysicsElement(el: HTMLElement) {
    // Make the body from the given element.
    const bodyToAdd = createPhysicsBodyFromDOM(el as HTMLElement, {
      isStatic: false,
      plugin: { domId: el.id, width: el.offsetWidth },
    });
    Composite.add(engine.current.world, bodyToAdd);

    // Save the id to the translation map.
    domMap.current.set(el.id, {
      isActive: true,
      x: bodyToAdd.position.x,
      y: bodyToAdd.position.y,
      angle: bodyToAdd.angle,
      width: bodyToAdd.plugin.weight,
    });

    return bodyToAdd;
  }

  return { ref, engine, runner, domMap, addPhysicsElement };
}

export default usePhysicsHook;
