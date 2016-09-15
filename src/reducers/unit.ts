import { AppState, Unit, Player, Selection } from '../AppState';
import { Action } from 'redux-actions';
import { getSelectedUnit, getAvailableMoves } from '../utils';
import { generateTown } from '../generators';
import { updatePlayerSeenTiles } from './player';
import { merge } from '../utils';

export const maybeMoveBy = (state: AppState, action: Action<number>) => {
    if (state.selection && state.selection.type !== 'unit')
        return state;

    let currentPlayer = state.players[state.currentPlayerIndex];

    const activeUnit = getSelectedUnit(state);

    const movementAvailableMap = getAvailableMoves(
        state.tiles[activeUnit.tileId],
        currentPlayer.seenTileIds.map(id => state.tiles[id]),
        activeUnit.movementLeft
    );

    if (movementAvailableMap.length === 0)
        return state;

    const result = movementAvailableMap
        .filter(map => map.tile === state.tiles[(action.payload as number)]);

    if (result.length === 0)
        return state;

    const nextState = updateSelectedUnit(state, () => ({
        tileId: action.payload,
        movementLeft: result[0].movementLeft,
    }));

    return updateCurrentPlayer(nextState, player => updatePlayerSeenTiles(player));
};

export const createCity = (state: AppState) => {
    const { tileId } = state.players[state.currentPlayerIndex].units
        .filter(unit => state.selection && unit.id === state.selection.id)[0];

    const playerId = state.players[state.currentPlayerIndex].id;

    const town = generateTown(tileId, playerId);

    state = updateCurrentPlayer(state, p => ({
        units: p.units.filter(u => state.selection && u.id !== state.selection.id),
        towns: [...p.towns, town],
    }));

    return merge(state, {
        selection: merge(state.selection, {
            type: 'town',
            id: town.id,
        } as Selection | null),
    });
};


function updateSelectedUnit(state: AppState, fn: (unit: Unit) => {}) {
    return updateCurrentPlayer(state, p => ({
        units: p.units.map(unit => {
            if (!state.selection) {
                return;
            }

            return unit.id === state.selection.id && state.selection.type === 'unit' ?
                merge(unit, fn(unit)) : unit;
        }),
    }));
}

function updateCurrentPlayer(state: AppState, fn: (p: Player) => {}) {
    const currentPlayer = state.players[state.currentPlayerIndex];
    return merge(state, {
        players: [
            ...state.players.slice(0, state.currentPlayerIndex),
            merge(currentPlayer, fn(currentPlayer)),
            ...state.players.slice(state.currentPlayerIndex + 1),
        ],
    });
}
