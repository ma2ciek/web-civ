import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Selection, Tile, Camera } from '../../AppState';
import { getAvailableTilesForUnit, getTileCameraPosition, isTileVisible } from '../../utils';
import { TILE_WIDTH } from '../../constants';

interface SelectedUnitMovementProps {
    selection: Selection | null;
    activePlayer: Player;
    camera: Camera;
    tiles: Tile[];
}

function _SelectedUnitMovement({ selection, activePlayer, camera, tiles }: SelectedUnitMovementProps) {
    if (!selection || selection.type !== 'unit')
        return <g></g>;

    const activeUnit = activePlayer.units.filter(unit => unit.id === selection.id)[0];
    const seenTiles = activePlayer.seenTileIds.map(id => tiles[id]);


    const availableTiles = getAvailableTilesForUnit(activeUnit, seenTiles)
        .filter(tile => isTileVisible(tile, camera));

    return (
        <g>
            {availableTiles.map(tile => {
                const position = getTileCameraPosition(tile.id, camera.zoom);
                return (
                    <g transform={'translate(' + position.left + ', ' + position.top + ')'} key={tile.id}>
                        <circle className='move-marker'
                            cx={TILE_WIDTH * camera.zoom / 2}
                            cy={TILE_WIDTH * camera.zoom / 2}
                            r={30 * camera.zoom}
                            stroke='green'
                            strokeWidth={10 * camera.zoom}
                            fill='yellow'
                            opacity={0.6}
                            />
                    </g>
                );
            })}

        </g>
    );
}

export const SelectedUnitMovement = connect(
    (state: AppState) => ({
        activePlayer: state.players[state.currentPlayerIndex],
        selection: state.selection,
        camera: state.camera,
        tiles: state.tiles,
    })
)(_SelectedUnitMovement);

