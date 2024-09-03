import { useCallback, useEffect, useRef } from 'react';
import './background-canvas.css';
import { animateCanvas } from './BackgroundCanvas';

function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  animateCanvas(canvas);
}

function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Memoize the handleResize function.
  const handleResize = useCallback(() => {
    if (canvasRef.current) {
      resizeCanvas(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      handleResize();

      window.addEventListener('resize', handleResize);
      // Clean up the listener if added.
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [handleResize]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default BackgroundCanvas;
