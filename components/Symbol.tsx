import { memo, useMemo } from 'react';
import { Path, PathProps } from 'react-native-svg';
import { Player } from '../App';

const INITIAL_PATH_SIZE = 24;

type SymbolProps = {
  itemSize?: number;
  type?: Player;
};

export const Symbol = memo<PathProps & SymbolProps>(
  ({ type = 'O', itemSize = INITIAL_PATH_SIZE, ...props }) => {
    const d = useMemo(
      () =>
        type === 'O'
          ? 'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
          : 'M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z',
      [type]
    );

    return (
      <Path
        fill="white"
        d={d}
        scale={itemSize / INITIAL_PATH_SIZE}
        {...props}
      />
    );
  }
);
