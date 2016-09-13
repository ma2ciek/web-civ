import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player } from '../../AppState';
import { PLAYER_COLORS, STORAGE_KEY } from '../../constants';

import './top-menu.scss';

interface TopMenuProps {
    turn: number;
    currentPlayerIndex: number;
    players: Player[];
    dispatch: Function;
}

declare const localforage: LocalForage;

const _TopMenu = ({ turn, players, currentPlayerIndex }: TopMenuProps) => {

    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer)
        return null;

    const color = PLAYER_COLORS[currentPlayer.id];

    function reset() {
        localforage.removeItem(STORAGE_KEY).then(() => location.href = '/');
    }

    return (
        <div className='top-menu'>
            <span style={{ backgroundColor: color, width: 20, height: 20 }}></span>
            <span>{'Turn: ' + turn}</span>
            <span className='action red' onClick={reset}>RESTART</span>
        </div>
    );
};

export const TopMenu = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        turn: state.turn,
    }),
    (dispatch: Function) => ({ dispatch })
)(_TopMenu);

