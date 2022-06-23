import { memo } from 'react';
import { Path, PathProps } from 'react-native-svg';
import { SymbolProps } from './XSymbol';

const INITIAL_PATH_SIZE = 24;

export const OSymbol = memo<PathProps & SymbolProps>(
  ({ itemSize = INITIAL_PATH_SIZE, ...props }) => {
    return (
      <Path
        fill="white"
        d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
        scale={itemSize / INITIAL_PATH_SIZE}
        {...props}
      />
    );
  }
);
