import { memo, useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { GameStateItem } from '../utilities/useGameLogic/types';
import { useGridCalculation } from '../utilities/useGridCalculation';
import { Position } from '../utilities/useGridCalculation/types';
import { SceneBorders } from './SceneBorder';
import { SceneItems } from './SceneItems';

type SceneProps = {
  sceneSize: number;
  gridSize: number;
  borderSize?: number;
  state: GameStateItem[];
  onSelect?: (position: Position) => void;
};

export const Scene = memo<SceneProps>(
  ({ sceneSize, gridSize, borderSize = 1, state, onSelect }) => {
    const { bordersStartPosition, itemSize, getPosition, getLocation } =
      useGridCalculation({ size: gridSize, borderSize, space: sceneSize });

    const onTouchEndCapture = useCallback(
      ({ nativeEvent: { locationX, locationY } }: GestureResponderEvent) => {
        const { position, isOnBorder } = getPosition({
          x: locationX,
          y: locationY,
        });

        const selectable = !state.some(
          ({ move }) =>
            move.row === position.row && move.column === position.column
        );

        if (!isOnBorder && selectable) onSelect?.(position);
      },
      [getPosition, onSelect, state]
    );

    return (
      <Svg
        height={sceneSize}
        width={sceneSize}
        onTouchEndCapture={onTouchEndCapture}
      >
        <Rect width="100%" height="100%" fill="coral" />
        <SceneBorders
          size={borderSize}
          bordersStartPosition={bordersStartPosition}
        />
        <SceneItems
          locationCalculator={getLocation}
          state={state}
          itemSize={itemSize}
        />
      </Svg>
    );
  }
);
