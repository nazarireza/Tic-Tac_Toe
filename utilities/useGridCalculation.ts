export const useGridCalculation = (
  gridSize: number,
  gridBorderSize: number,
  gridSpace: number
) => {
  const borderCount = gridSize - 1;

  const itemSize = (gridSpace - borderCount * gridBorderSize) / gridSize;

  const bordersStartPosition = Array.from({ length: borderCount }).map(
    (_, index) => (index + 1) * itemSize + index * gridBorderSize
  );

  const checkIfOnBorder = (x: number, y: number) => {
    return bordersStartPosition.some(
      (p) =>
        (x >= p && x <= p + gridBorderSize) ||
        (y >= p && y <= p + gridBorderSize)
    );
  };

  const getRowAndColumn = (
    x: number,
    y: number
  ): { row: number; column: number; isOnBorder: boolean } => {
    const isOnBorder = checkIfOnBorder(x, y);
    if (isOnBorder) return { row: -1, column: -1, isOnBorder: true };

    const verticalBordersSize =
      bordersStartPosition.filter((p) => p < x).length * gridBorderSize;
    const horizontalBordersSize =
      bordersStartPosition.filter((p) => p < y).length * gridBorderSize;

    const row = Math.floor((y - horizontalBordersSize) / itemSize);
    const column = Math.floor((x - verticalBordersSize) / itemSize);
    return { row, column, isOnBorder: false };
  };

  return {
    itemSize,
    bordersStartPosition,
    getRowAndColumn,
  };
};
