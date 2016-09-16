import { AppState, Unit, Player, Selection } from '../AppState';
import { Action } from 'redux-actions';
import { merge, getSelectedUnit, getAvailableMoves, getSurroundingTileIds } from '../utils';
import { generateTown } from '../generators';
import { updatePlayerSeenTiles } from './player';

export const maybeMoveBy = (state: AppState, action: Action<number>) => {
    if (state.selection && state.selection.type !== 'unit')
        return state;

    let currentPlayer = state.players[state.currentPlayerIndex];

    const activeUnit = getSelectedUnit(state);

    if (!activeUnit)
        return state;

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

export const distanceAttack = (state: AppState, action: Action<Unit>) => {
    return state;
};

export const meleeAttack = (state: AppState, action: Action<Unit>) => {
    const enemy = <Unit>action.payload;
    const selectedtUnit = <Unit>getSelectedUnit(state);

    if (!isMeleeAttackAvailableFactory(state)(enemy))
        return state;

    const ids = getSurroundingTileIds([selectedtUnit.tileId]);
    if (ids.indexOf(enemy.tileId) === -1)
        return state;

    const hpLeft = enemy.hpLeft - selectedtUnit.meleeDamage;

    if (hpLeft <= 0) {
        state = removeUnitFromState(state, enemy);
        state = updateUnit(state, selectedtUnit, {
            tileId: enemy.tileId,
            movementLeft: 0,
        });
    } else {
        state = updateUnit(state, enemy, { hpLeft });
        state = updateUnit(state, selectedtUnit, { movementLeft: 0 });
    }

    return state;
}

export function isMeleeAttackAvailableFactory(state: AppState) {
    const currentUnit = getSelectedUnit(state);

    return (enemy: Unit | null | undefined) => (
        !!enemy &&
        !!currentUnit &&
        !!currentUnit.meleeDamage &&
        currentUnit.movementLeft >= 1 &&
        getSurroundingTileIds([currentUnit.tileId]).indexOf(enemy.tileId) !== -1
    );
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

function updateUnit(state: AppState, unit: Unit, enhancement: {}) {
    const player = state.players[unit.ownerId];
    const unitIndex = player.units.indexOf(unit);
    return updatePlayer(state, state.players[unit.ownerId], {
        units: [
            ...player.units.slice(0, unitIndex),
            merge(unit, enhancement),
            ...player.units.slice(unitIndex + 1),
        ],
    });
}

function removeUnitFromState(state: AppState, unit: Unit) {
    let player = state.players[unit.ownerId];
    const unitIndex = player.units.indexOf(unit);

    return updatePlayer(state, player, {
        units: [
            ...player.units.slice(0, unitIndex),
            ...player.units.slice(unitIndex + 1),
        ],
    });
}

function updatePlayer(state: AppState, player: Player, enhancement: {}) {
    return merge(state, {
        players: [
            ...state.players.slice(0, player.id),
            merge(player, enhancement),
            ...state.players.slice(player.id + 1),
        ],
    });
}