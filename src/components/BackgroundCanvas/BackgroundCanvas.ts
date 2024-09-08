// The ordering of colors for the gradient. Each color maintains a record of
// its initial value, orig, the current value, val, and the index of the color
// that it is animating towards, next.
type RGBA = [number, number, number, number];

type Color = { orig: RGBA; val: RGBA; next: number };

function getAnimatedGradient(canvas: HTMLCanvasElement, colors: Array<Color>) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Create a linear gradient from the top left to the bottom right corner.
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    // Shift each color towards the next one in the sequence.
    colors[0].val = shiftColor(colors[0].val, colors[colors[0].next].orig);
    colors[1].val = shiftColor(colors[1].val, colors[colors[1].next].orig);
    colors[2].val = shiftColor(colors[2].val, colors[colors[2].next].orig);

    // If the colors are all equal to their successors, shift the indices
    // so we animate each color towards a different value.
    if (
      colors[0].val.join() === colors[colors[0].next].orig.join() &&
      colors[1].val.join() === colors[colors[1].next].orig.join() &&
      colors[2].val.join() === colors[colors[2].next].orig.join()
    ) {
      // Update color indices for the next stepping.
      colors[0].next = (colors[0].next + 1) % colors.length;
      colors[1].next = (colors[1].next + 1) % colors.length;
      colors[2].next = (colors[2].next + 1) % colors.length;
    }

    // Create the gradient based on the latest color values.
    gradient.addColorStop(0.0, 'rgba(' + colors[0].val[0] + ', ' + colors[0].val[1] + ', ' + colors[0].val[2] + ', 1.0)');
    gradient.addColorStop(0.2, 'rgba(' + colors[0].val[0] + ', ' + colors[0].val[1] + ', ' + colors[0].val[2] + ', 1.0)');
    gradient.addColorStop(0.4, 'rgba(' + colors[1].val[0] + ', ' + colors[1].val[1] + ', ' + colors[1].val[2] + ', 1.0)');
    gradient.addColorStop(0.6, 'rgba(' + colors[1].val[0] + ', ' + colors[1].val[1] + ', ' + colors[1].val[2] + ', 1.0)');
    gradient.addColorStop(0.8, 'rgba(' + colors[2].val[0] + ', ' + colors[2].val[1] + ', ' + colors[2].val[2] + ', 1.0)');
    gradient.addColorStop(1.0, 'rgba(' + colors[2].val[0] + ', ' + colors[2].val[1] + ', ' + colors[2].val[2] + ', 1.0)');

    return gradient;
  }
}

// Shift a single color channel, ca, towards a secondary
// channel, cb. If the two channels are equal, ca is returned.
function shiftChannel(ca: number, cb: number) {
  if (ca > cb) {
    return ca - 1;
  } else if (ca < cb) {
    return ca + 1;
  }

  return ca;
}

// Shift a color, ca, towards a secondary color, cb.
// Both colors are in the range RGBA: [0, 255]
function shiftColor(ca: RGBA, cb: RGBA): RGBA {
  var red = shiftChannel(ca[0], cb[0]);
  var green = shiftChannel(ca[1], cb[1]);
  var blue = shiftChannel(ca[2], cb[2]);
  var alpha = shiftChannel(ca[3], cb[3]);

  return [red, green, blue, alpha];
}

// Utility function to convert hex color to RGB
function hexToRgba(hex: string): RGBA {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b, 255];
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

  const waveSpeed = 0.003;
  const waveAmplitude = 75;

  const hexColors: string[] = [
    '#4CAF50', // Medium Green
    '#66BB6A', // Lighter Green
    '#81C784', // Even Lighter Green
    '#9CCC65', // Light Green
    '#A5D6A7', // Very Light Green
    '#7B1FA2', // Medium Purple
    '#8E24AA', // Lighter Purple
    '#CE93D8', // Light Purple
    '#E1BEE7', // Very Light Purple
    '#3F51B5', // Medium Indigo
  ];

  const colorArray: Array<Color> = hexColors.map((hex, ind) => {
    return { orig: hexToRgba(hex), val: hexToRgba(hex), next: ind + 1 === hexColors.length ? 0 : ind + 1 };
  });

  const animate = () => {
    if (ctx) {
      // const gradient = getAnimatedGradient(ctx, canvas.width, 0, frame, colors, 0.05, 50); // Calculate the gradient...
      const gradient = getAnimatedGradient(canvas, colorArray);
      if (gradient) drawBanner(ctx, gradient, canvas.height, canvas.width, Math.sin(frame * waveSpeed) * waveAmplitude);

      frame++;
    }
    requestAnimationFrame(animate);
  };

  animate();
}
