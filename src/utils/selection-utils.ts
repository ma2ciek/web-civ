import { AppState, Unit, Selection, Town, Player } from '../AppState';
import { getTileMapPosition } from './tile-utils';

export function getNextSelection(state: AppState): Selection {
    if (!!getNextUnit(state)) {
        return { type: 'unit', id: getNextUnit(state).id };
    }

    if (!!getNextTown(state)) {
        return { type: 'town', id: (<Town>getNextTown(state)).id };
    }

    return { type: 'none', id: 0 };
}

function getNextUnit(state: AppState): Unit {
    const currentPlayer = state.players[state.currentPlayerIndex];
    return currentPlayer.units.filter(u => u.movementLeft >= 1 && u.id !== state.selection.id)[0];
}

function getNextTown(_: AppState): Town | null {
    // const currentPlayer = state.players[state.currentPlayerIndex];
    // TODO - town actions 
    // return currentPlayer.towns.filter(t => t.builded && t.id !== state.selection.id)[0];
    return null;
}

export function getSelected(player: Player, tileWidth: number) {
    const units = player.units;
    const towns = player.towns;

    // TODO - index: 0 (?)
    return (units.length > 0) ? ({
        selection: {
            type: 'unit',
            id: units[0].id,
        },
        tilePosition: getTileMapPosition(units[0].tileId, tileWidth),
    }) : ({
        selection: {
            type: 'town',
            id: towns[0].id,
        },
        tilePosition: getTileMapPosition(towns[0].tileId, tileWidth),
    });
}

export function getSelectedUnit(state: AppState) {
    let currentPlayer = state.players[state.currentPlayerIndex];

    return currentPlayer.units
        .filter(u => u.id === state.selection.id)[0];
}