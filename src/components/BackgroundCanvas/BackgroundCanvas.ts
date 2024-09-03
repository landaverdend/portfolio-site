function getPurpleGreenLinearGradient(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const grad = ctx.createLinearGradient(0, 0, width, 0);

  grad.addColorStop(0, 'rgba(47, 47, 220, 0.33)'); // light purple
  grad.addColorStop(1, 'rgba(0, 179, 30, 0.41)'); // light green

  return grad;
}

function drawBanner(ctx: CanvasRenderingContext2D, height: number, width: number) {
  ctx.beginPath();
  ctx.moveTo(0, 0);

  // Draw the shape from the top, to the bottom, to the right side, and closee off at the top again.

  const startHeight = height * 0.6;
  const endHeight = height * 0.23;

  ctx.lineTo(0, startHeight);
  // ctx.quadraticCurveTo(width * 0.6, startHeight * 0.75, width, endHeight);
  // Use the following site to generate:
  // https://igm.rit.edu/~acjvks/courses/shared/330/sg-2/bezier-curve-playgrounds/cubic-bezier-curves-playground.html
  ctx.bezierCurveTo(0.4 * width, 0.65 * height, 0.42 * width, 0.23 * height, width, endHeight);

  ctx.lineTo(width, endHeight);
  ctx.lineTo(width, 0);
  ctx.lineTo(0, 0);

  ctx.fillStyle = getPurpleGreenLinearGradient(ctx, width, height);

  ctx.fill();
}

export function animateCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');

  console.log('inside animateCanvas()');
  if (ctx) {
    drawBanner(ctx, canvas.height, canvas.width);
  }
}
