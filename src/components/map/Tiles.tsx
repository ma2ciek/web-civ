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

export function _Tiles({ players, currentPlayerIndex, camera, tiles, dispatch }: TilesProps) {
    const currentPlayer = players[currentPlayerIndex];

    const visibleTiles = currentPlayer.seenTileIds
        .map(id => tiles[id])
        .filter(tile => isTileVisible(tile, camera)).map(tile =>
            <TileComponent
                onMouseEnter={() => setTimeout(() => dispatch(hoverTile(tile.id)), 0) }
                onMouseLeave={() => dispatch(hoverTile(-1))}
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

