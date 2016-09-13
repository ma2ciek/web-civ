import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Selection } from '../../AppState';
import { selectUnit } from '../../actions';
import { UnitComponent } from './UnitComponent';

interface UnitsProps {
    players: Player[];
    currentPlayerIndex: number;
    zoom: number;
    selected: Selection;
    dispatch: Function;
}

function _Units({ players, currentPlayerIndex, zoom, selected, dispatch }: UnitsProps) {
    const currentPlayer = players[currentPlayerIndex];

    const units = players.map(player =>
        player.units
            .filter(unit => currentPlayer.seenTileIds.indexOf(unit.tileId) > -1)
            .map(unit => {

                return (
                    <UnitComponent
                        unit={unit}
                        scale={zoom}
                        key={unit.id}
                        selected={player.id === currentPlayer.id && selected.id === unit.id}
                        onContextMenu={() => { } }
                        onClick={() => {
                            if (unit.ownerId === currentPlayer.id) {
                                dispatch(selectUnit(unit));
                            }
                        } } />
                );
            })
    );

    return <g className='units'>{ units }</g>;
}

export const Units = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        selected: state.selection,
        zoom: state.camera.zoom,
    })
)(_Units);

