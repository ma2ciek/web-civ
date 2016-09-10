import * as React from 'react';
import { Tile } from '../AppState';
import { TILE_WIDTH, getTilePosition } from '../Tile';


interface TileContentProps {
    tile: Tile;
    onContextMenu(): void;
}


const WaterPattern = () => (
    <defs>
        <pattern id='water' patternUnits='userSpaceOnUse' width='300' height='300'>
            <image xlinkHref='images/water-texture.jpg' x='0' y='0' width='300' height='300' />
        </pattern>
    </defs>
);

const GrassPattern = () => (
    <defs>
        <pattern id='grass' patternUnits='userSpaceOnUse' width='300' height='300'>
            <image xlinkHref='images/grass-texture.jpg' x='0' y='0' width='300' height='300' />
        </pattern>
    </defs>
);

const ForestPattern = () => (
    <defs>
        <pattern id='forest' patternUnits='userSpaceOnUse' width='300' height='300'>
            <image xlinkHref='images/forest-texture.jpg' x='0' y='0' width='300' height='300' />
        </pattern>
    </defs>
);

const mapTypeToPattern: { [type: string]: () => JSX.Element; } = {
    water: WaterPattern,
    forest: ForestPattern,
    grass: GrassPattern,
};

export const TileComponent = ({ tile, onContextMenu }: TileContentProps) => {
    const Pattern = mapTypeToPattern[tile.type];

    return (
        <svg onContextMenu={() => onContextMenu()} className='tile' viewBox='0 20 300 260' width={TILE_WIDTH} style={getTilePosition(tile)}>
            <Pattern />
            <polygon points='300,150 225,280 75,280 0,150 75,20 225,20' fill={'url(#' + tile.type + ')'}></polygon>
        </svg>
    );
};
