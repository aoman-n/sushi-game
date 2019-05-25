export function checkInFrame<T extends { x: number; y: number }>(
  obj: T,
): boolean {
  if (obj.x <= 700 && obj.x >= 0 && obj.y <= 400 && obj.y >= 0) {
    return true;
  }

  return false;
}
