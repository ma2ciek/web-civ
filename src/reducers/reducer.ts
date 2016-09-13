import { AppState, Player, Unit, Town } from '../AppState';
import { handleActions, Action } from 'redux-actions';

import {
    CREATE_CITY,
    DESELECT,
    GENERATE_PLAYERS,
    MAYBE_MOVE_BY,
    MOVE_CAMERA,
    NEXT_SELECTION,
    NEXT_TURN,
    SELECT_TOWN,
    SELECT_UNIT,
    ZOOM_MAP,
} from '../actions';

import { generateTiles } from '../generators/generateTiles';
import { generatePlayers } from '../generators/generatePlayers';

import {
    getTileMapPosition,
    getSurroundingTileIds,
    getAvailableMoves,
    getNextSelection,
    getSelected,
    getSelectedUnit,
} from '../utils';

import * as uniq from 'lodash/uniq';
import { merge } from '../utils';
import { cameraReducer } from './cameraReducer';

const initialState: AppState = {
    tiles: generateTiles(),
    players: [],
    turn: 0,
    currentPlayerIndex: 0,
    camera: {
        left: 0,
        top: 0,
        zoom: 0.3,
    },
    selection: {
        type: 'none',
        id: 0,
    },
};

export default handleActions<AppState, {}>({
    [GENERATE_PLAYERS]: state => {
        const players = generatePlayers({ allTiles: state.tiles })
            .map(p => merge(p, {
                seenTileIds: uniq(getSurroundingTileIds(
                    p.units.map(u => u.tileId)
                )).sort(),
            }));

        const selectedUnit = players[0].units[0];
        const firstUnitTile = getTileMapPosition(selectedUnit.tileId, state.camera.zoom);

        return merge(state, {
            selection: {
                type: 'unit',
                id: selectedUnit.id,
            },
            players,
            camera: merge(state.camera, firstUnitTile),
        });
    },

    [NEXT_TURN]: state => {
        const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
        const nextPlayer = state.players[nextPlayerIndex];

        const { selection, tilePosition } = getSelected(nextPlayer, state.camera.zoom);

        return merge(state, {
            selection: selection,
            currentPlayerIndex: nextPlayerIndex,
            turn: state.turn + (nextPlayerIndex === 0 ? 1 : 0),
            camera: tilePosition ? merge(state.camera, tilePosition) : state.camera,

            players: state.players.map(p => merge(p, {
                units: p.units.map(unit => merge(unit, {
                    movementLeft: unit.movement,
                })),
            })),
        });
    },

    [DESELECT]: (state) => merge(state, {
        // TODO - disable when dragging
        // selection: {
        //     type: 'none',
        //     id: -1,
        // },
    }),

    [SELECT_UNIT]: (state: AppState, action: Action<{ id: number }>) => merge(state, {
        selection: {
            type: 'unit',
            id: action.payload.id,
        },
    }),

    [SELECT_TOWN]: (state: AppState, action: Action<{ id: number }>) => merge(state, {
        selection: {
            type: 'town',
            id: action.payload.id,
        },
    }),

    [NEXT_SELECTION]: (state) => {
        let nextSelection = getNextSelection(state);
        return merge(state, { selection: nextSelection });
    },

    [MAYBE_MOVE_BY]: (state: AppState, action: Action<{ tileId: number }>) => {
        if (state.selection.type !== 'unit')
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

        const result = movementAvailableMap.filter(map => map.tile === state.tiles[action.payload.tileId]);

        if (result.length === 0)
            return state;

        const nextState = updateSelectedUnit(state, () => ({
            tileId: action.payload.tileId,
            movementLeft: result[0].movementLeft,
        }));

        return updateCurrentPlayer(nextState, player => ({
            seenTileIds: uniq([
                ...player.seenTileIds,
                ...getSurroundingTileIds(
                    player.units.map(u => u.tileId)
                ).sort(),
            ]),
        }));
    },

    [CREATE_CITY]: (state) => {
        const { tileId } = state.players[state.currentPlayerIndex].units
            .filter(unit => unit.id === state.selection.id)[0];

        const playerId = state.players[state.currentPlayerIndex].id;

        const town: Town = {
            tileId: tileId,
            ownerId: playerId,
            id: Math.random(),
            name: 'Unnamed town',
            buildings: [],
        };

        state = updateCurrentPlayer(state, p => ({
            units: p.units.filter(u => u.id !== state.selection.id),
            towns: [...p.towns, town],
        }));

        return merge(state, {
            selection: merge(state.selection, {
                type: 'town',
                id: town.id,
            }),
        });
    },

    [ZOOM_MAP]: (state, action) => merge(state, {
        camera: cameraReducer(state.camera, action),
    }),

    [MOVE_CAMERA]: (state, action) => merge(state, {
        camera: cameraReducer(state.camera, action),
    }),
}, initialState);


function updateSelectedUnit(state: AppState, fn: (unit: Unit) => {}) {
    return updateCurrentPlayer(state, p => ({
        units: p.units.map(unit =>
            unit.id === state.selection.id && state.selection.type === 'unit' ?
                merge(unit, fn(unit)) : unit
        ),
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