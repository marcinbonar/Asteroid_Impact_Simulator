export const drawCrater = (ctx, x, y, diameter) => {
    const craterRadius = (diameter / 2) * 0.1;
    ctx.beginPath();
    ctx.arc(x, y, craterRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 69, 0, 0.5)';
    ctx.fill();
};