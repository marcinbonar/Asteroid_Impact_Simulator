export const drawCustomPin = (ctx, x, y, asteroidIcon) => {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 10, y - 30);
    ctx.lineTo(x + 10, y - 30);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 35, 12, 0, Math.PI * 2, true);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();

    const image = new Image();
    image.src = asteroidIcon;
    image.onload = () => {
        ctx.drawImage(image, x - 8, y - 43, 16, 16);
    };
};