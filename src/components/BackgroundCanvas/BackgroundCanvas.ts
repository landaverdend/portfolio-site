function getPurpleGreenLinearGradient(ctx: CanvasRenderingContext2D, width: number, oscillation: number) {
  const grad = ctx.createLinearGradient(0, 0, width, 0);

  grad.addColorStop(0, 'rgba(226, 171, 255, 0.45)'); // light purple
  grad.addColorStop(1, 'rgba(16, 187, 53, 0.45)'); // light green

  return grad;
}

function drawBanner(ctx: CanvasRenderingContext2D, height: number, width: number, oscillation: number) {
  // Clear the canvas each frame...
  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.moveTo(0, 0);

  // Draw the shape from the top, to the bottom, to the right side with a b, and closee off at the top again.

  const startHeight = height * 0.6;
  const endHeight = height * 0.23;

  ctx.lineTo(0, startHeight); // From top left down

  // Use the following site to generate base bezier curve across canvas:
  // https://igm.rit.edu/~acjvks/courses/shared/330/sg-2/bezier-curve-playgrounds/cubic-bezier-curves-playground.html

  // Oscillate the control points using the oscillation value
  ctx.bezierCurveTo(
    0.4 * width + oscillation,
    startHeight + oscillation,
    0.6 * width + oscillation,
    endHeight + oscillation,
    width,
    endHeight + oscillation
  );

  // close off the bezier.
  // ctx.lineTo(width, endHeight);
  ctx.lineTo(width, 0);
  ctx.lineTo(0, 0);

  ctx.fillStyle = getPurpleGreenLinearGradient(ctx, width, oscillation);

  ctx.fill();
}

export function animateCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  let frame = 0;

  const speed = 0.002;
  const amplitude = 50;

  const animate = () => {
    if (ctx) {
      drawBanner(ctx, canvas.height, canvas.width, Math.sin(frame * speed) * amplitude);

      frame++;
    }
    requestAnimationFrame(animate);
  };

  animate();
}
