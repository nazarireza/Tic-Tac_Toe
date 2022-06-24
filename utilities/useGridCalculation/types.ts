export type Position = {
  row: number;
  column: number;
};

export type Location = {
  x: number;
  y: number;
};

export type GetLocation = (position: Position) => Location;

export type GetPosition = (location: Location) => {
  position: Position;
  isOnBorder: boolean;
};

export type CheckIfOnBorder = (location: Location) => boolean;
