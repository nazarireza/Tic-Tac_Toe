import { Player, PlayersContainer } from './types';

export const initialTurn: Player = 'O';

export const initialMoves: (size: number) => PlayersContainer = (size) => {
  const initialMoveContainer = Array.from({ length: size }).map((p) => 0);
  return {
    O: {
      rows: [...initialMoveContainer],
      columns: [...initialMoveContainer],
      diagonal: 0,
      oppositeDiagonal: 0,
    },
    X: {
      rows: [...initialMoveContainer],
      columns: [...initialMoveContainer],
      diagonal: 0,
      oppositeDiagonal: 0,
    },
  };
};
