import { useCallback, useEffect, useRef } from 'react';
import './background-canvas.css';

function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  console.log('Width: ' + canvas.width + ' Height: ' + canvas.height);
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
      // const ctx = canvas.getContext('2d');

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
