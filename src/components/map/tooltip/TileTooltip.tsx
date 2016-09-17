import * as React from 'react';
import { Tile, Player } from '../../../AppState';
import { toUpperCaseFirstLetter } from '../../../utils';
import { tileTypes } from '../../../constants';

interface TileTooltipProps {
    tile: Tile;
    owner: Player | null;
}

export const TileTooltip = ({ tile, owner }: TileTooltipProps) => {
    const upperCaseTileName = toUpperCaseFirstLetter(tile.type);

    return (
        <div>
            <h2>{upperCaseTileName}</h2>
            <p>ID: {tile.id}</p>
            <p>Owner: {!owner ? 'none' : owner.nation}</p>
            <p>Movement cost: {tileTypes[tile.type].moveCost}</p>
        </div >
    );
};