export function valueToPoint(value, index, originX, originY) {
  const x = 0;
  const y = -value;
  const angle = ((Math.PI * 2) / 6) * index;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const tx = x * cos - y * sin + originX;
  const ty = x * sin + y * cos + originY;
  return {
    x: tx,
    y: ty,
  };
}
