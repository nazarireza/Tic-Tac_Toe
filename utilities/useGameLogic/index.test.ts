import { renderHook, act } from '@testing-library/react-hooks';
import { useGameLogic } from '.';

describe('useGameLogic', () => {
  test("player's turn changes correctly", () => {
    const { result } = renderHook(() =>
      useGameLogic({ size: 3, onFinish: () => {} })
    );

    expect(result.current.turn).toBe('O');

    act(() => result.current.move({ row: 1, column: 2 }));
    expect(result.current.turn).toBe('X');

    act(() => result.current.move({ row: 2, column: 2 }));
    expect(result.current.turn).toBe('O');
  });

  test("move method changes player's state correctly", () => {
    const { result } = renderHook(() =>
      useGameLogic({ size: 3, onFinish: () => {} })
    );

    act(() => result.current.move({ row: 1, column: 2 }));
    expect(result.current.state).toEqual([
      { player: 'O', move: { row: 1, column: 2 } },
    ]);

    act(() => result.current.move({ row: 2, column: 1 }));
    expect(result.current.state).toEqual([
      { player: 'O', move: { row: 1, column: 2 } },
      { player: 'X', move: { row: 2, column: 1 } },
    ]);
  });

  test('win by rows', () => {
    const callBack = jest.fn();

    const { result } = renderHook(() =>
      useGameLogic({ size: 3, onFinish: callBack })
    );

    act(() => result.current.move({ row: 0, column: 0 }));
    act(() => result.current.move({ row: 1, column: 0 }));

    act(() => result.current.move({ row: 0, column: 1 }));
    act(() => result.current.move({ row: 1, column: 1 }));

    act(() => result.current.move({ row: 0, column: 2 }));
    act(() => result.current.move({ row: 1, column: 2 }));

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(callBack).toHaveBeenCalledWith({
      winner: 'O',
      reset: expect.any(Function),
    });
  });

  test('win by columns', () => {
    const callBack = jest.fn();

    const { result } = renderHook(() =>
      useGameLogic({ size: 3, onFinish: callBack })
    );

    act(() => result.current.move({ row: 0, column: 0 }));
    act(() => result.current.move({ row: 0, column: 2 }));

    act(() => result.current.move({ row: 1, column: 1 }));
    act(() => result.current.move({ row: 1, column: 2 }));

    act(() => result.current.move({ row: 0, column: 2 }));
    act(() => result.current.move({ row: 2, column: 2 }));

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(callBack).toHaveBeenCalledWith({
      winner: 'X',
      reset: expect.any(Function),
    });
  });

  test('win by diagonal', () => {
    const callBack = jest.fn();

    const { result } = renderHook(() =>
      useGameLogic({ size: 3, onFinish: callBack })
    );

    act(() => result.current.move({ row: 0, column: 1 }));
    act(() => result.current.move({ row: 0, column: 0 }));

    act(() => result.current.move({ row: 0, column: 2 }));
    act(() => result.current.move({ row: 1, column: 1 }));

    act(() => result.current.move({ row: 1, column: 0 }));
    act(() => result.current.move({ row: 2, column: 2 }));

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(callBack).toHaveBeenCalledWith({
      winner: 'X',
      reset: expect.any(Function),
    });
  });

  test('win by opposite diagonal', () => {
    const callBack = jest.fn();

    const { result } = renderHook(() =>
      useGameLogic({ size: 3, onFinish: callBack })
    );

    act(() => result.current.move({ row: 0, column: 2 }));
    act(() => result.current.move({ row: 0, column: 1 }));

    act(() => result.current.move({ row: 1, column: 1 }));
    act(() => result.current.move({ row: 0, column: 0 }));

    act(() => result.current.move({ row: 0, column: 2 }));

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(callBack).toHaveBeenCalledWith({
      winner: 'O',
      reset: expect.any(Function),
    });
  });

  test('game over', () => {
    const callBack = jest.fn();

    const { result } = renderHook(() =>
      useGameLogic({ size: 3, onFinish: callBack })
    );

    act(() => result.current.move({ row: 0, column: 0 }));
    act(() => result.current.move({ row: 0, column: 1 }));

    act(() => result.current.move({ row: 0, column: 2 }));
    act(() => result.current.move({ row: 1, column: 1 }));

    act(() => result.current.move({ row: 1, column: 2 }));
    act(() => result.current.move({ row: 1, column: 0 }));

    act(() => result.current.move({ row: 2, column: 1 }));
    act(() => result.current.move({ row: 2, column: 2 }));

    act(() => result.current.move({ row: 2, column: 0 }));

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(callBack).toHaveBeenCalledWith({
      reset: expect.any(Function),
    });
  });
});
