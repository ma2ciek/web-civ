import { AppState, Unit, Selection, Town, Player, Position } from '../AppState';
import { getTileCameraPosition } from './tile-utils';

export function getNextSelection(state: AppState): Selection | null {
    if (!!getNextUnit(state)) {
        return { type: 'unit', id: getNextUnit(state).id };
    }

    if (!!getNextTown(state)) {
        return { type: 'town', id: (<Town>getNextTown(state)).id };
    }

    return null;
}

function getNextUnit(state: AppState): Unit {
    const currentPlayer = state.players[state.currentPlayerIndex];
    return currentPlayer.units.filter(u =>
        u.movementLeft >= 1 &&
        state.selection &&
        u.id !== state.selection.id
    )[0];
}

function getNextTown(_: AppState): Town | null {
    // const currentPlayer = state.players[state.currentPlayerIndex];
    // TODO - town actions 
    // return currentPlayer.towns.filter(t => t.builded && t.id !== state.selection.id)[0];
    return null;
}

export function getSelected(player: Player, zoom: number) {
    const {units, towns} = player;

    // TODO - index: 0 (?)
    return (units.length > 0) ? ({
        selection: {
            type: 'unit',
            id: units[0].id,
        },
        tilePosition: getTileCameraPosition(units[0].tileId, zoom),
    }) : ({
        selection: {
            type: 'town',
            id: towns[0].id,
        },
        tilePosition: getTileCameraPosition(towns[0].tileId, zoom),
    });
}

export function getSelectedUnit(state: AppState) {
    let currentPlayer = state.players[state.currentPlayerIndex];

    return currentPlayer.units.filter(u =>
        state.selection &&
        u.id === state.selection.id
    )[0];
}

export function getSelectedTilePosition(state: AppState, selection: Selection): Position {
    if (selection.type === 'unit') {
        const unit = state.players[state.currentPlayerIndex].units
            .filter(u => u.id === selection.id)[0];
        return getTileCameraPosition(unit.tileId, state.camera.zoom);
    } else if (selection.type === 'town') {
        const town = state.players[state.currentPlayerIndex].towns
            .filter(t => t.id === selection.id)[0];
        return getTileCameraPosition(town.tileId, state.camera.zoom);
    } else {
        throw (new Error('type is not implmeneted: ' + selection.type))
    }
}