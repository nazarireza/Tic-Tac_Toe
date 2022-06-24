import { memo } from 'react';
import { GameStateItem } from '../App';
import { GetLocation } from '../utilities/useGridCalculation';
import { Symbol } from './Symbol';

type SceneItemsProps = {
  itemSize: number;
  state: GameStateItem[];
  locationCalculator: GetLocation;
};

export const SceneItems = memo<SceneItemsProps>(
  ({ itemSize, state, locationCalculator }) => {
    return (
      <>
        {state.map(({ player, move }, i) => {
          const location = locationCalculator(move);
          return (
            <Symbol
              key={i}
              type={player}
              itemSize={itemSize}
              x={location.x}
              y={location.y}
            />
          );
        })}
      </>
    );
  }
);
