import * as React from 'react';
import { Tile } from '../../AppState';
import { getTileMapPosition } from '../../utils';
import { Hex } from './Hex';

interface TileContentProps {
    tile: Tile;
    scale: number;
    onContextMenu(): void;
    onClick(): void;
}

export function TileComponent({ tile, onContextMenu, onClick, scale }: TileContentProps) {
    const { left, top } = getTileMapPosition(tile.id, scale);

    return (
        <g
            onContextMenu={() => onContextMenu() }
            onClick={() => onClick() }
            className='tile'
            transform={'translate(' + left + ', ' + top + ')'}>
            <Hex scale={scale} pattern={tile.type} />
        </g>
    );
};
