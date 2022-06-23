import { memo, useCallback } from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { GRID_BORDER_SIZE } from '../assets/constants';
import { useGridCalculation } from '../utilities/useGridCalculation';
import { OSymbol } from './OSymbol';
import { SceneBorders } from './SceneBorder';
import { XSymbol } from './XSymbol';

type SceneProps = {
  sceneSize: number;
  gridSize: number;
  onSelect?: ({ row, column }: { row: number; column: number }) => void;
};

export const Scene = memo<SceneProps>(({ sceneSize, gridSize, onSelect }) => {
  const { bordersStartPosition, itemSize, getRowAndColumn } =
    useGridCalculation(gridSize, GRID_BORDER_SIZE, sceneSize);

  const onTouchEndCapture = useCallback(
    ({ nativeEvent: { locationX, locationY } }: GestureResponderEvent) => {
      const { row, column, isOnBorder } = getRowAndColumn(locationX, locationY);
      !isOnBorder && onSelect?.({ row, column });
    },
    [getRowAndColumn, onSelect]
  );

  return (
    <View style={styles.container}>
      <Svg
        height={sceneSize}
        width={sceneSize}
        onTouchEndCapture={onTouchEndCapture}
      >
        <Rect width="100%" height="100%" fill="coral" />
        <SceneBorders bordersStartPosition={bordersStartPosition} />
        <XSymbol itemSize={itemSize} />
        <OSymbol itemSize={itemSize} x={itemSize + GRID_BORDER_SIZE} />
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
