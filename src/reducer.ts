import { AppState, Player, Unit, Town, Selection, Position } from './AppState';
import { handleActions } from 'redux-actions';
import {
    GENERATE_MAP,
    GENERATE_PLAYERS,
    MOVE_CAMERA,
    NEXT_TURN,
    MAYBE_MOVE_BY,
    CREATE_CITY,
    SELECT_UNIT,
    SELECT_TOWN,
    ZOOM_MAP,
} from './actions';
import { generateTiles } from './generators/generateTiles';
import { generatePlayers } from './generators/generatePlayers';
import { getTilePosition, getSurroundingTiles, getAvailableMoves } from './tile-utils';
import { uniq } from 'lodash';

function join<X, Y>(x: X, y: Y) {
    return Object.assign({}, x, y);
}

const initialState: AppState = {
    tiles: [],
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

export default handleActions<AppState, any>({
    [GENERATE_MAP]: state => join(state, {
        tiles: generateTiles(),
    }),

    [GENERATE_PLAYERS]: state => {
        const players = generatePlayers({ allTiles: state.tiles })
            .map(p => join(p, {
                seenTileIds: uniq(getSurroundingTiles({
                    allTiles: state.tiles,
                    tiles: p.units.map(u => state.tiles[u.tileId]),
                })).map(t => t.id),
            }));

        const selectedUnit = players[0].units[0];
        const firstUnitTile = getTilePosition(selectedUnit.tileId, state.camera.zoom);

        return join(state, {
            selection: {
                type: 'unit',
                id: selectedUnit.id,
            },
            players,
            camera: join(state.camera, firstUnitTile),
        });
    },

    [MOVE_CAMERA]: (state, action) => join(state, {
        camera: join(state.camera, {
            left: state.camera.left + action.payload.left,
            top: state.camera.top + action.payload.top,
        }),
    }),

    [NEXT_TURN]: state => {
        const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
        const nextPlayer = state.players[nextPlayerIndex];

        const {selection, tilePosition } = getSelected(nextPlayer, state.camera.zoom);

        return join(state, {
            selection: selection,
            currentPlayerIndex: nextPlayerIndex,
            turn: state.turn + (nextPlayerIndex === 0 ? 1 : 0),
            camera: tilePosition ? join(state.camera, tilePosition) : state.camera,

            players: state.players.map(p => join(p, {
                units: p.units.map(unit => join(unit, {
                    movementLeft: unit.movement,
                })),
            })),
        });
    },

    [SELECT_UNIT]: (state, action) => {
        return join(state, {
            selection: {
                type: 'unit',
                id: action.payload.id,
            },
        });
    },

    [SELECT_TOWN]: (state, action) => {
        return join(state, {
            selection: {
                type: 'town',
                id: action.payload.id,
            },
        });
    },

    [MAYBE_MOVE_BY]: (state, action) => {
        if (state.selection.type !== 'unit')
            return state;

        let currentPlayer = state.players[state.currentPlayerIndex];

        const activeUnit = getActiveUnit(state);

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

        state = updateSelectedUnit(state, unit => ({
            tileId: action.payload.tileId,
            movementLeft: result[0].movementLeft,
        }));

        currentPlayer = state.players[state.currentPlayerIndex];

        return updateCurrentPlayer(state, p => join(state, {
            seenTileIds: uniq([
                ...currentPlayer.seenTileIds,
                ...getSurroundingTiles({
                    allTiles: state.tiles,
                    tiles: currentPlayer.units.map(u => state.tiles[u.tileId]),
                }).map(t => t.id),
            ]),
        }));
    },

    [CREATE_CITY]: (state, action) => {
        const { tileId } = state.players[state.currentPlayerIndex].units
            .filter(unit => unit.id === state.selection.id)[0];

        const playerId = state.players[state.currentPlayerIndex].id;

        const town: Town = {
            tile: join(state.tiles[tileId], { ownerId: playerId }),
            ownerId: playerId,
            id: Math.random(),
            name: 'Unnamed town',
            buildings: [],
        };

        state = updateCurrentPlayer(state, p => ({
            units: p.units.filter(u => u.id !== state.selection.id),
            towns: [...p.towns, {
                tile: join(state.tiles[tileId], { ownerId: p.id }),
                ownerId: p.id,
                id: Math.random(),
                name: 'Unnamed town',
                buildings: [],
            }],
        }));

        return join(state, {
            selection: join(state.selection, {
                type: 'town',
                id: town.id,
            }),
        });
    },

    [ZOOM_MAP]: (state, action) => {

        const change = (1 + action.payload * 0.03);
        // TODO - min / max zoom

        return join(state, {
            camera: join(state.camera, {
                zoom: state.camera.zoom * change,
                left: state.camera.left * change,
                top: state.camera.top * change,
            }),
        });
    },


}, initialState);

function updateCurrentPlayer(state: AppState, fn: (p: Player) => {}) {
    return join(state, {
        players: state.players
            .map((p, id) =>
                id === state.currentPlayerIndex ?
                    join(p, fn(p)) : p
            ),
    });
}

function updateSelectedUnit(state: AppState, fn: (unit: Unit) => {}) {
    return updateCurrentPlayer(state, p => ({
        units: p.units.map(unit =>
            unit.id === state.selection.id && state.selection.type === 'unit' ?
                join(unit, fn(unit)) : unit
        ),
    }));
}

interface Output {
    selection: Selection;
    tilePosition: Position;
}

function getSelected(player: Player, tileWidth: number): Output {
    const units = player.units;
    const towns = player.towns;

    // TODO - index: 0 (?)
    return (units.length > 0) ? ({
        selection: {
            type: 'unit',
            id: units[0].id,
        },
        tilePosition: getTilePosition(units[0].tileId, tileWidth),
    }) : ({
        selection: {
            type: 'town',
            id: towns[0].id,
        },
        tilePosition: getTilePosition(towns[0].tile.id, tileWidth),
    });
}

function getActiveUnit(state: AppState) {
    let currentPlayer = state.players[state.currentPlayerIndex];

    return currentPlayer.units
        .filter(u => u.id === state.selection.id)[0];
}