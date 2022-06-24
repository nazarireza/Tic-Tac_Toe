import { DependencyList, useCallback, useMemo } from 'react';
import { CheckIfOnBorder, GetLocation, GetPosition } from './types';

// custom hooks which is responsible to do all the grid's calculations
export const useGridCalculation = ({
  size,
  borderSize,
  space,
}: {
  size: number;
  borderSize: number;
  space: number;
}) => {
  // we should ensure the calculations will be regenerated only once the props are changed
  const deps: DependencyList = [size, borderSize, space];

  // the border count based on the grid size
  const borderCount = useMemo<number>(() => size - 1, deps);

  // the item size will be calculated by the space and grid size
  // note that we've considered the borders size and they're subtracted from grid space
  const itemSize = useMemo<number>(
    () => (space - borderCount * borderSize) / size,
    deps
  );

  // to render the border we're gonna calculate the start position of each border inside the grid
  // note that the calculations of a border is dependent to previous borders and items
  const bordersStartPosition = useMemo<number[]>(
    () =>
      Array.from({ length: borderCount }).map(
        (_, index) => (index + 1) * itemSize + index * borderSize
      ),
    deps
  );

  // check if the touched location is on the borders. we use this method to skip the move event when the user touches on the borders
  const checkIfOnBorder = useCallback<CheckIfOnBorder>(({ x, y }) => {
    return bordersStartPosition.some(
      (p) => (x >= p && x <= p + borderSize) || (y >= p && y <= p + borderSize)
    );
  }, deps);

  // get the grid's row and column based on absolute position
  const getPosition = useCallback<GetPosition>((location) => {
    const isOnBorder = checkIfOnBorder(location);
    if (isOnBorder)
      return { position: { row: -1, column: -1 }, isOnBorder: true };

    // sum of the borders size which have got smaller location than current
    // we'll need both of vertical and horizontal borders
    const verticalBordersSize =
      bordersStartPosition.filter((p) => p < location.x).length * borderSize;
    const horizontalBordersSize =
      bordersStartPosition.filter((p) => p < location.y).length * borderSize;

    const row = Math.floor((location.y - horizontalBordersSize) / itemSize);
    const column = Math.floor((location.x - verticalBordersSize) / itemSize);
    return { position: { row, column }, isOnBorder: false };
  }, deps);

  // get the absolute position based on the row and column
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
