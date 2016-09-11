import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Selection, Tile, Camera} from '../AppState';
import { getAvailableTilesForUnit, getTilePosition, isTileVisible} from '../tile-utils';
import { TILE_WIDTH } from '../constants';

interface SelectedUnitMovementProps {
    selection: Selection;
    players: Player[];
    currentPlayerIndex: number;
    camera: Camera;
    tiles: Tile[];
}

function _SelectedUnitMovement({ selection, players, currentPlayerIndex, camera, tiles }: SelectedUnitMovementProps) {
    if (selection.type !== 'unit')
        return null;

    const activePlayer = players[currentPlayerIndex];

    const activeUnit = activePlayer.units.filter(unit => unit.id === selection.id)[0];
    const seenTiles = activePlayer.seenTileIds.map(id => tiles[id]);


    const availableTiles = getAvailableTilesForUnit(activeUnit, seenTiles)
        .filter(tile => isTileVisible(tile, camera));

    return (
        <g>
            { availableTiles.map(tile => {
                const position = getTilePosition(tile.id, camera.zoom);
                return (
                    <g transform={'translate(' + position.left + ', ' + position.top + ')'} key={tile.id}>
                        <circle className='move-marker'
                            cx={ TILE_WIDTH * camera.zoom / 2 }
                            cy={ TILE_WIDTH * camera.zoom / 2 }
                            r={ 30 * camera.zoom }
                            stroke='green'
                            strokeWidth='4'
                            fill='yellow'
                            opacity={0.6}
                            />
                    </g>
                );
            }) }

        </g>
    );
}

export const SelectedUnitMovement = connect(
    (state: AppState) => ({
        selection: state.selection,
        players: state.players,
        currentPlayerIndex: state.currentPlayerIndex,
        camera: state.camera,
        tiles: state.tiles,
    })
)(_SelectedUnitMovement);

