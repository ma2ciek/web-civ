import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player } from '../AppState';
import { nextTurn } from '../actions';
import { IconReload } from '../icons';
import { PLAYER_COLORS } from '../constants';

interface TopMenuProps {
    turn: number;
    currentPlayerIndex: number;
    players: Player[];
    dispatch: Function;
}

const _TopMenu = ({ turn, players, currentPlayerIndex, dispatch }: TopMenuProps) => {

    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer)
        return null;

    return (
        <div className='top-menu'>
            <span className='current-player'>{'Current player: ' + PLAYER_COLORS[currentPlayer.id]}</span>
            <span className='current-turn'>{'Turn: ' + turn}</span>
            <a onClick={() => dispatch(nextTurn())}><IconReload /></a>
        </div>
    );
};

export const TopMenu = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        turn: state.turn,
    })
)(_TopMenu);
