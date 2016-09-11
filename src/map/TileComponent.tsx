import * as React from 'react';
import { Tile } from '../AppState';
import { getTilePosition } from '../tile-utils';
import { Hex } from './Hex';

interface TileContentProps {
    tile: Tile;
    scale: number;
    onContextMenu(): void;
}

export function TileComponent({ tile, onContextMenu, scale }: TileContentProps) {
    const { left, top } = getTilePosition(tile.id, scale);

    return (
        <g onContextMenu={() => onContextMenu() } className='tile'
            transform={'translate(' + left + ', ' + top + ')'}>
            <Hex scale={scale} pattern={tile.type} />
        </g>
    );
};
