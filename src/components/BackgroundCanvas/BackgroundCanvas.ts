function getAnimatedGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: number,
  colors: Array<string>,
  speed: number,
  amplitude: number
): CanvasGradient {
  // const grad = ctx.createLinearGradient(0, 0, width, 0);
  // Calculate dynamic start and end points for the gradient
  const y1 = Math.cos(frame * speed) * amplitude + height * 0.5;
  const y2 = height - y1;
  const grad = ctx.createLinearGradient(0, y1, width, y2);

  // Iterate over the colors array and modify each color
  colors.forEach((color, index) => {
    // Convert the color from hex to RGB
    const [r, g, b] = hexToRgb(color);

    // Apply sine wave oscillation to each color component
    const rOscillated = Math.floor(r + 30 * Math.sin(frame * speed + index));
    const gOscillated = Math.floor(g + 30 * Math.sin(frame * speed + index + Math.PI / 3));
    const bOscillated = Math.floor(b + 30 * Math.sin(frame * speed + index + Math.PI / 2));

    // Add the oscillated color as a color stop
    grad.addColorStop(index / (colors.length - 1), `rgba(${rOscillated}, ${gOscillated}, ${bOscillated}, 0.4)`);
  });

  return grad;
}

// Utility function to convert hex color to RGB
function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function drawBanner(ctx: CanvasRenderingContext2D, grad: CanvasGradient, height: number, width: number, oscillation: number) {
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
    0.4 * width + oscillation * 0.5,
    startHeight + oscillation * 0.9,
    0.6 * width + oscillation * 0.8,
    endHeight + oscillation * 0.7,
    width,
    endHeight + oscillation * 0.95
  );

  ctx.lineTo(width, 0);
  ctx.lineTo(0, 0);

  ctx.fillStyle = grad;

  ctx.fill();
}

export function animateCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  let frame = 0;

  const speed = 0.002;
  const amplitude = 100;

  const colors = [
    '#32CD32', // Medium Green (Lime Green)
    '#90EE90', // Light Green
    '#FFB6C1', // Light Pink
    '#D8BFD8', // Light Purple (Thistle)
    '#9a7cd6', // medium purple
  ];

  const animate = () => {
    if (ctx) {
      const gradient = getAnimatedGradient(ctx, canvas.width, 0, frame, colors, 0.05, amplitude); // Calculate the gradient...
      drawBanner(ctx, gradient, canvas.height, canvas.width, Math.sin(frame * speed) * amplitude);

      frame++;
    }
    requestAnimationFrame(animate);
  };

  animate();
}
