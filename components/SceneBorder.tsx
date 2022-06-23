import { Fragment, memo } from 'react';
import { Rect } from 'react-native-svg';
import { GRID_BORDER_SIZE } from '../assets/constants';

type SceneBordersProps = {
  bordersStartPosition?: number[];
};

export const SceneBorders = memo<SceneBordersProps>(
  ({ bordersStartPosition = [] }) => {
    return (
      <>
        {bordersStartPosition.map((position, i) => (
          <Fragment key={i}>
            <Rect
              width={GRID_BORDER_SIZE}
              height="100%"
              fill="white"
              x={position}
            />
            <Rect
              height={GRID_BORDER_SIZE}
              width="100%"
              fill="white"
              y={position}
            />
          </Fragment>
        ))}
      </>
    );
  }
);
