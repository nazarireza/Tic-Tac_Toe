import { DependencyList, useCallback, useMemo } from 'react';
import { CheckIfOnBorder, GetLocation, GetPosition } from './types';

export const useGridCalculation = ({
  size,
  borderSize,
  space,
}: {
  size: number;
  borderSize: number;
  space: number;
}) => {
  const deps: DependencyList = [size, borderSize, space];

  const borderCount = useMemo<number>(() => size - 1, deps);

  const itemSize = useMemo<number>(
    () => (space - borderCount * borderSize) / size,
    deps
  );

  const bordersStartPosition = useMemo<number[]>(
    () =>
      Array.from({ length: borderCount }).map(
        (_, index) => (index + 1) * itemSize + index * borderSize
      ),
    deps
  );

  const checkIfOnBorder = useCallback<CheckIfOnBorder>(({ x, y }) => {
    return bordersStartPosition.some(
      (p) => (x >= p && x <= p + borderSize) || (y >= p && y <= p + borderSize)
    );
  }, deps);

  const getPosition = useCallback<GetPosition>((location) => {
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
  }, deps);

  const getLocation = useCallback<GetLocation>(({ row, column }) => {
    const locationX = column * itemSize + column * borderSize;
    const locationY = row * itemSize + row * borderSize;
    return { x: locationX, y: locationY };
  }, deps);

  return {
    itemSize,
    bordersStartPosition,
    getPosition,
    getLocation,
  };
};
