import { useCallback, useEffect, useRef } from 'react';
import { animateCanvas } from './BackgroundCanvas';
import './background-canvas.css';

function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  animateCanvas(canvas);
}

type BGCProps = {
  flipped?: boolean;
};
function BackgroundCanvas({ flipped }: BGCProps) {
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
      <canvas className={`${flipped ? 'flipped' : ''}`} ref={canvasRef}></canvas>
    </>
  );
}

export default BackgroundCanvas;
