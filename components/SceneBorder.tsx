import { Fragment, memo } from 'react';
import { Rect } from 'react-native-svg';

type SceneBordersProps = {
  bordersStartPosition?: number[];
  size?: number;
};

export const SceneBorders = memo<SceneBordersProps>(
  ({ bordersStartPosition = [], size = 1 }) => {
    return (
      <>
        {bordersStartPosition.map((position, i) => (
          <Fragment key={i}>
            <Rect
              width={size}
              height="100%"
              fill="white"
              x={position}
            />
            <Rect
              height={size}
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
