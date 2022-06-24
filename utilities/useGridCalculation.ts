export type Position = {
  row: number;
  column: number;
};

export type Location = {
  x: number;
  y: number;
};

export type GetLocation = (position: Position) => Location;
type GetPosition = (location: Location) => {
  position: Position;
  isOnBorder: boolean;
};
type CheckIfOnBorder = (location: Location) => boolean;

export const useGridCalculation = (
  size: number,
  borderSize: number,
  space: number
) => {
  const borderCount = size - 1;

  const itemSize = (space - borderCount * borderSize) / size;

  const bordersStartPosition = Array.from({ length: borderCount }).map(
    (_, index) => (index + 1) * itemSize + index * borderSize
  );

  const checkIfOnBorder: CheckIfOnBorder = ({ x, y }) => {
    return bordersStartPosition.some(
      (p) => (x >= p && x <= p + borderSize) || (y >= p && y <= p + borderSize)
    );
  };

  const getPosition: GetPosition = (location) => {
    const isOnBorder = checkIfOnBorder(location);
    if (isOnBorder)
      return { position: { row: -1, column: -1 }, isOnBorder: true };

    const verticalBordersSize =
      bordersStartPosition.filter((p) => p < location.x).length * borderSize;
    const horizontalBordersSize =
      bordersStartPosition.filter((p) => p < location.y).length * borderSize;

    const row = Math.floor((location.y - horizontalBordersSize) / itemSize);
    const column = Math.floor((location.x - verticalBordersSize) / itemSize);
    return { position: { row, column }, isOnBorder: false };
  };

  const getLocation: GetLocation = ({ row, column }) => {
    const locationX = column * itemSize + column * borderSize;
    const locationY = row * itemSize + row * borderSize;
    return { x: locationX, y: locationY };
  };

  return {
    itemSize,
    bordersStartPosition,
    getPosition,
    getLocation,
  };
};
