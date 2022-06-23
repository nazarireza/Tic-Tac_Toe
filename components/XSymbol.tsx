import { memo } from 'react';
import { Path, PathProps } from 'react-native-svg';

const INITIAL_PATH_SIZE = 24;

export type SymbolProps = {
  itemSize?: number;
};

export const XSymbol = memo<PathProps & SymbolProps>(
  ({ itemSize = INITIAL_PATH_SIZE, ...props }) => {
    return (
      <Path
        fill="white"
        d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
        scale={itemSize / INITIAL_PATH_SIZE}
        {...props}
      />
    );
  }
);
