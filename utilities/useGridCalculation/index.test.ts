import { renderHook, act } from '@testing-library/react-hooks';
import { useGridCalculation } from '.';

describe('useGridCalculation', () => {
  test('calculate the "itemSize" with no border correctly', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 0, space: 90 })
    );

    expect(result.current.itemSize).toBe(30);
  });

  test('calculate the "itemSize" with border correctly', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 5, space: 90 })
    );

    expect(result.current.itemSize).toBe(80 / 3);
  });

  test('calculate the "bordersStartPosition" correctly', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 5, space: 100 })
    );

    expect(result.current.bordersStartPosition).toEqual([30, 65]);
  });

  test('borders start position must be equal with items start position when there is no border', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 0, space: 90 })
    );

    expect(result.current.bordersStartPosition).toEqual([30, 60]);
  });

  test('"getPosition" works correctly', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 5, space: 100 })
    );

    const methodResult = result.current.getPosition({ x: 90, y: 40 });
    expect(methodResult.position).toMatchObject({
      row: 1,
      column: 2,
    });
  });

  test('"getPosition" check for if location is on the border horizontally', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 5, space: 100 })
    );

    const methodResult = result.current.getPosition({ x: 66, y: 40 });
    expect(methodResult.isOnBorder).toBe(true);
  });

  test('"getPosition" check for if location is not on the border horizontally', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 5, space: 100 })
    );

    const methodResult = result.current.getPosition({ x: 71, y: 40 });
    expect(methodResult.isOnBorder).toBe(false);
  });

  test('"getPosition" check for if location is on the border vertically', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 5, space: 100 })
    );

    const methodResult = result.current.getPosition({ x: 40, y: 66 });
    expect(methodResult.isOnBorder).toBe(true);
  });

  test('"getPosition" check for if location is not on the border vertically', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 5, space: 100 })
    );

    const methodResult = result.current.getPosition({ x: 40, y: 71 });
    expect(methodResult.isOnBorder).toBe(false);
  });

  test('"getLocation" works with no border correctly', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 0, space: 90 })
    );

    const methodResult = result.current.getLocation({ row: 2, column: 2 });
    expect(methodResult).toMatchObject({
      x: 60,
      y: 60,
    });
  });

  test('"getLocation" works with border correctly', () => {
    const { result } = renderHook(() =>
      useGridCalculation({ size: 3, borderSize: 5, space: 100 })
    );

    const methodResult = result.current.getLocation({ row: 1, column: 2 });
    expect(methodResult).toMatchObject({
      x: 70,
      y: 35,
    });
  });
});
