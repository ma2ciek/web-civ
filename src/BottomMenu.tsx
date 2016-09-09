import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player } from './AppState';
import { nextTurn } from './actions';
import { IconReload } from './icons';

interface BottomMenuProps {
    turn: number;
    currentPlayerIndex: number;
    players: Player[];
    dispatch: Function;
    selectedUnitIndex: number;
}

const _BottomMenu = ({ turn, players, currentPlayerIndex, dispatch, selectedUnitIndex}: BottomMenuProps) => {

    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer)
        return null;

    return (
        <div className='bottom-menu'>
            <span>{ 'currentPlayer: ' + currentPlayer.id }</span>
            <span>{ 'Turn: ' + turn }</span>
            <button onClick={ () => dispatch(nextTurn()) }><IconReload /></button>

            <span>{ 'Selected unit: ' + currentPlayer.units[selectedUnitIndex].name }</span>
        </div>
    );
}

export const BottomMenu = connect(
    (state: AppState) => ({
        selectedUnitIndex: state.selectedUnitIndex,
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        turn: state.turn,
    })
)(_BottomMenu);
