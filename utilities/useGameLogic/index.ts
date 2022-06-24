import { useCallback, useRef, useState } from 'react';
import { Position } from '../useGridCalculation/types';
import { initialMoves, initialTurn } from './constants';
import { GameStateItem, Player, PlayersContainer } from './types';

export const useGameLogic = ({
  size,
  onFinish,
}: {
  size: number;
  onFinish: (e: { winner?: Player; reset: () => void }) => void;
}) => {
  const [turn, setTurn] = useState<Player>(initialTurn);
  const [state, setState] = useState<GameStateItem[]>([]);
  const movesCount = useRef<number>(0);
  const movesContainer = useRef<PlayersContainer>(initialMoves(size));

  const reset = useCallback(() => {
    setTurn(initialTurn);
    setState([]);
    movesCount.current = 0;
    movesContainer.current = initialMoves(size);
  }, []);

  const toggleTurn = useCallback(
    () => setTurn((prev) => (prev === 'O' ? 'X' : 'O')),
    []
  );

  const updateState = useCallback(
    (position: Position) =>
      setState((prev) => [...prev, { player: turn, move: position }]),
    [turn]
  );

  const updatePlayerMove = useCallback(
    (position: Position) => {
      movesContainer.current[turn].rows[position.row] += 1;
      movesContainer.current[turn].columns[position.column] += 1;

      if (position.row === position.column)
        movesContainer.current[turn].diagonal += 1;

      if (position.row + position.column === size - 1)
        movesContainer.current[turn].oppositeDiagonal += 1;
    },
    [turn, size]
  );

  const checkForWinner = useCallback(
    (position: Position) => {
      const winByRow = movesContainer.current[turn].rows[position.row] === size;
      const winByColumn =
        movesContainer.current[turn].columns[position.column] === size;
      const winByDiagonal = movesContainer.current[turn].diagonal === size;
      const winByOppositeDiagonal =
        movesContainer.current[turn].oppositeDiagonal === size;

      const isWin =
        winByRow || winByColumn || winByDiagonal || winByOppositeDiagonal;

      return isWin;
    },
    [turn, size]
  );

  const checkForFinished = useCallback(() => {
    const isFinished = movesCount.current === size * size;
    return isFinished;
  }, [size]);

  const move = useCallback(
    (position: Position) => {
      movesCount.current += 1;
      updateState(position);
      updatePlayerMove(position);

      const win = checkForWinner(position);
      if (win) {
        onFinish({ winner: turn, reset });
        return;
      }

      const finished = checkForFinished();
      if (finished) {
        onFinish({ reset });
        return;
      }

      toggleTurn();
    },
    [
      toggleTurn,
      updateState,
      updatePlayerMove,
      checkForWinner,
      checkForFinished,
      onFinish,
    ]
  );

  return { turn, state, move };
};
