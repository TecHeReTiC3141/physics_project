export function drawButton(ctx: CanvasRenderingContext2D) {
  ctx.save()

  ctx.beginPath()

  if (this.active) {
    ctx.fillStyle = '#70EC70';
    ctx.roundRect(this.x, this.y, this.width, this.height, 3);
    ctx.fill()
  }

  ctx.beginPath()
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.roundRect(
    this.x + ctx.lineWidth / 2,
    this.y + ctx.lineWidth / 2,
    this.width - ctx.lineWidth,
    this.height - ctx.lineWidth,
      3
  );
  ctx.stroke();

  if (this.text) {
    ctx.beginPath()
    ctx.fillStyle = this.textColor || 'black';
    ctx.font = `${this.fontSize || 6}px ${this.fontFamily || 'Arial'}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = Math.floor(this.x + this.width / 2);
    const centerY = Math.floor(this.y + this.height / 2);

    ctx.fillText(this.text, centerX, centerY);
  }
  ctx.restore()
}