import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Camera, Tile } from '../../AppState';
import { maybeMoveCurrentUnit, deselect, hoverTile } from '../../actions';
import { TileComponent } from './TileComponent';
import { isTileVisible } from '../../utils';

interface TilesProps {
    players: Player[];
    currentPlayerIndex: number;
    camera: Camera;
    tiles: Tile[];
    hoveredTileIndex: number;
    dispatch: Function;
}

export function _Tiles({ players, currentPlayerIndex, camera, tiles, hoveredTileIndex, dispatch }: TilesProps) {
    const currentPlayer = players[currentPlayerIndex];

    const visibleTiles = currentPlayer.seenTileIds
        .map(id => tiles[id])
        .filter(tile => isTileVisible(tile, camera)).map(tile =>
            <TileComponent
                width={200}
                hovered={hoveredTileIndex === tile.id}
                onMouseEnter={() => dispatch(hoverTile(tile.id))}
                tile={tile}
                key={tile.id}
                scale={camera.zoom}
                onContextMenu={() => dispatch(maybeMoveCurrentUnit(tile))}
                onClick={() => dispatch(deselect())} />
        );

    return <g className='tiles'>{visibleTiles}</g>;
}

export const Tiles = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        camera: state.camera,
        tiles: state.tiles,
        hoveredTileIndex: state.hoveredTileIndex,
    })
)(_Tiles);

