import { AppState, Player, Unit, Town, Selected, Position } from './AppState';
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
import { getTilePosition, getSurroundingTiles } from './Tile';
import { uniq } from 'lodash';

const assign = Object.assign;

const initialState: AppState = {
    tiles: [],
    players: [],
    turn: 0,
    currentPlayerIndex: 0,
    camera: {
        left: 0,
        top: 0,
        zoom: 1,
    },
    selected: {
        type: 'none',
        id: 0,
    },
};


export default handleActions<AppState, any>({
    [GENERATE_MAP]: state => assign({}, state, {
        tiles: generateTiles(),
    }),

    [GENERATE_PLAYERS]: state => {
        const players = generatePlayers({ tiles: state.tiles })
            .map(p => assign({}, p, {
                seenTiles: uniq(getSurroundingTiles(state.tiles, p.units.map(u => u.tile))),
            }));

        const currentPlayer = players[0];
        const selectedUnit = currentPlayer.units[0];
        const firstUnitTile = getTilePosition(selectedUnit.tile, state.camera.zoom);

        return assign({}, state, {
            selected: {
                type: 'unit',
                id: selectedUnit.id,
            },
            players,
            currentPlayer,
            camera: assign({}, state.camera, firstUnitTile),
        });
    },

    [MOVE_CAMERA]: (state, action) => assign({}, state, {
        camera: assign({}, state.camera, {
            left: state.camera.left + action.payload.left,
            top: state.camera.top + action.payload.top,
        }),
    }),

    [NEXT_TURN]: state => {
        const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
        const nextPlayer = state.players[nextPlayerIndex];

        const {selected, tilePosition } = getSelected(nextPlayer, state.camera.zoom);

        return assign({}, state, {
            selected: selected,
            currentPlayerIndex: nextPlayerIndex,
            turn: state.turn + (nextPlayerIndex === 0 ? 1 : 0),
            camera: tilePosition ? assign({}, state.camera, tilePosition) : state.camera,
        });
    },

    [SELECT_UNIT]: (state, action) => {
        return assign({}, state, {
            selected: {
                type: 'unit',
                id: action.payload.id,
            },
        });
    },

    [SELECT_TOWN]: (state, action) => {
        return assign({}, state, {
            selected: {
                type: 'town',
                id: action.payload.id,
            },
        });
    },

    [MAYBE_MOVE_BY]: (state, action) => {
        // TODO - check if unit can move

        state = updateSelectedUnit(state, unit => ({
            tile: action.payload.tile,
        }));

        const currentPlayer = state.players[state.currentPlayerIndex];

        return updateCurrentPlayer(state, p => assign({}, state, {
            seenTiles: uniq([
                ...currentPlayer.seenTiles,
                ...getSurroundingTiles(
                    state.tiles,
                    currentPlayer.units.map(u => u.tile)
                ),
            ]),
        }));
    },

    [CREATE_CITY]: (state, action) => {
        const { tile } = state.players[state.currentPlayerIndex].units
            .filter(unit => unit.id === state.selected.id)[0];

        const playerId = state.players[state.currentPlayerIndex].id;

        const town: Town = {
            tile: assign({}, tile, { ownerId: playerId }),
            ownerId: playerId,
            id: Math.random(),
            name: 'Unnamed town',
            buildings: [],
        };

        state = updateCurrentPlayer(state, p => ({
            units: p.units.filter(u => u.id !== state.selected.id),
            towns: [...p.towns, {
                tile: assign({}, tile, { ownerId: p.id }),
                ownerId: p.id,
                id: Math.random(),
                name: 'Unnamed town',
                buildings: [],
            }],
        }));

        return assign({}, state, {
            selected: assign({}, state.selected, {
                type: 'town',
                id: town.id,
            }),
        });
    },

    [ZOOM_MAP]: (state, action) => {

        const change = (1 + action.payload * 0.03);

        return assign({}, state, {
            camera: assign({}, state.camera, {
                zoom: state.camera.zoom * change,
                left: state.camera.left * change,
                top: state.camera.top * change,
            }),
        });
    },


}, initialState);

function updateCurrentPlayer(state: AppState, fn: (p: Player) => {}) {
    return assign({}, state, {
        players: state.players
            .map((p, id) =>
                id === state.currentPlayerIndex ?
                    assign({}, p, fn(p)) : p
            ),
    });
}

function updateSelectedUnit(state: AppState, fn: (unit: Unit) => {}) {
    return updateCurrentPlayer(state, p => ({
        units: p.units.map(unit =>
            unit.id === state.selected.id && state.selected.type === 'unit' ?
                assign({}, unit, fn(unit)) : unit
        ),
    }));
}

interface Output {
    selected: Selected;
    tilePosition: Position;
}

function getSelected(player: Player, tileWidth: number): Output {
    const units = player.units;
    const towns = player.towns;

    return (units.length > 0) ? ({
        selected: {
            type: 'unit',
            id: units[0].id,
        },
        tilePosition: getTilePosition(units[0].tile, tileWidth),
    }) : ({
        selected: {
            type: 'town',
            id: towns[0].id,
        },
        tilePosition: getTilePosition(towns[0].tile, tileWidth),
    });
}