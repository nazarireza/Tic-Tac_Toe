import { Position } from '../useGridCalculation/types';

export type Player = 'X' | 'O';

export type GameStateItem = {
  player: Player;
  move: Position;
};

export type MoveContainer = {
  rows: number[];
  columns: number[];
  diagonal: number;
  oppositeDiagonal: number;
};

export type PlayersContainer = {
  O: MoveContainer;
  X: MoveContainer;
};
