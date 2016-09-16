import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Unit, Player, Selection } from '../../AppState';
import { selectUnit, meleeAttack } from '../../actions';
import { UnitComponent } from './UnitComponent';
import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { isMeleeAttackAvailableFactory } from '../../reducers/unit';

interface UnitsProps {
    players: Player[];
    currentPlayerIndex: number;
    zoom: number;
    selection: Selection | null;
    dispatch: Dispatch<AppState>;
    isMeleeAttackAvailable(unit: Unit): boolean;
}

function _Units({ players, currentPlayerIndex, zoom, selection, isMeleeAttackAvailable, dispatch}: UnitsProps) {
    const currentPlayer = players[currentPlayerIndex];

    const units = players.map(player =>
        player.units
            .filter(unit => currentPlayer.seenTileIds.indexOf(unit.tileId) > -1)
            .map(unit => {
                const meleeAttackAvailable = isMeleeAttackAvailable(unit);
                return (
                    <UnitComponent
                        unit={unit}
                        scale={zoom}
                        key={unit.id}
                        selected={player.id === currentPlayer.id && !!selection && selection.id === unit.id}
                        meleeAttackAvailable={meleeAttackAvailable}
                        onContextMenu={() => meleeAttackAvailable && dispatch(meleeAttack(unit))}
                        onClick={() => unit.ownerId === currentPlayer.id && dispatch(selectUnit(unit))} />
                );
            })
    );

    return <g className='units'>{units}</g>;
}

export const Units = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        selection: state.selection,
        zoom: state.camera.zoom,
        isMeleeAttackAvailable: isMeleeAttackAvailableFactory(state),
    }),
    (dispatch: Dispatch<AppState>) => ({ dispatch })
)(_Units);

