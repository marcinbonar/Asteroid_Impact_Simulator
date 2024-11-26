export const drawImpactDirection = (ctx, x, y, angle, setImpactDirection) => {
    const length = 100;
    const randomOffset = (Math.random() - 0.5) * 10;
    const adjustedAngle = angle + randomOffset;
    const radians = (adjustedAngle * Math.PI) / 180;
    const xEnd = x + length * Math.cos(radians);
    const yEnd = y + length * Math.sin(radians);

    if (typeof setImpactDirection === 'function') {
        setImpactDirection(`X: ${xEnd.toFixed(2)}, Y: ${yEnd.toFixed(2)}`);
    }

    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xEnd, yEnd);
    ctx.lineTo(
        xEnd - 10 * Math.cos(radians - Math.PI / 6),
        yEnd - 10 * Math.sin(radians - Math.PI / 6)
    );
    ctx.lineTo(
        xEnd - 10 * Math.cos(radians + Math.PI / 6),
        yEnd - 10 * Math.sin(radians + Math.PI / 6)
    );
    ctx.lineTo(xEnd, yEnd);
    ctx.fillStyle = 'orange';
    ctx.fill();
};
