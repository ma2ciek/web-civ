import * as React from 'react';
import { getTilePosition } from '../Tile';
import { Town } from '../AppState';
import { Hex } from './Hex';

interface TownComponentProps {
    scale: number;
    town: Town;
    selected: boolean;
    onClick(): void;
    onContextMenu(): void;
}

export function TownComponent({ town, onContextMenu, onClick, selected, scale }: TownComponentProps) {
    const { left, top } = getTilePosition(town.tile, scale);

    return (
        <g style={{ overflow: 'visible' }} onContextMenu={() => onContextMenu()} onClick={() => onClick()}
            className={'town' + (selected ? ' selected-Town' : '')}
            transform={'translate(' + left + ', ' + top + ')'}>

            <Hex scale={scale} pattern='middle-age-city' />

            <text fontSize={20}
                x={scale / 2}
                textAnchor='middle'
                fill='white'>
                {town.name}
            </text>
        </g>
    );
};
