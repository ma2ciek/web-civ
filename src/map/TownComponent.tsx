import * as React from 'react';
import { getTilePosition } from '../tile-utils';
import { Town } from '../AppState';
import { Hex } from './Hex';
import { TILE_WIDTH } from '../constants';

interface TownComponentProps {
    scale: number;
    town: Town;
    selected: boolean;
    onClick(): void;
    onContextMenu(): void;
}

export function TownComponent({ town, onContextMenu, onClick, selected, scale }: TownComponentProps) {
    const { left, top } = getTilePosition(town.tile.id, scale);

    return (
        <g onContextMenu={() => onContextMenu() }
            onClick={() => onClick() }
            className={'town' + (selected ? ' selected' : '') }
            transform={'translate(' + left + ', ' + top + ')'}>

            <Hex scale={scale} pattern='middle-age-city' />

            <text fontSize={40 * scale}
                x={TILE_WIDTH * scale / 2}
                textAnchor='middle'
                fill='white'>
                {town.name}
            </text>
        </g>
    );
};
