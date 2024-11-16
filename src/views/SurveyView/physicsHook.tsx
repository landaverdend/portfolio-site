import { Bodies, Composite, Engine, Render, Runner } from 'matter-js';
import { useEffect, useRef } from 'react';

function usePhysicsHook(shouldRender = false) {
  // Build the Matter.JS stuff
  const ref = useRef<HTMLDivElement>(null);
  const engine = useRef<Matter.Engine>(Engine.create());
  const runner = useRef<Matter.Runner>(Runner.create());

  useEffect(function initObjects() {
    Runner.run(runner.current, engine.current);

    let render: Matter.Render;
    if (shouldRender) {
      render = Render.create({
        element: document.body, // Attach the canvas to the document body
        engine: engine.current,
        options: {
          width: ref.current?.clientWidth,
          height: ref.current?.clientHeight,
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
    const width = ref.current?.clientWidth ?? 0;
    const height = ref.current?.clientHeight ?? 0;

    const ground = Bodies.rectangle(width / 2, height + 20, width, 50, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, 0, width, 1, {
      isStatic: true,
    });
    const wallL = Bodies.rectangle(0, height / 2, 25, height, {
      isStatic: true,
    });
    const wallR = Bodies.rectangle(width, height / 2, 25, height, {
      isStatic: true,
    });

    Composite.add(engine.current.world, [ground, ceiling, wallL, wallR]);
  }, []);

  return { ref, engine, runner };
}

export default usePhysicsHook;
