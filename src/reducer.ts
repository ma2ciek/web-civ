import { AppState } from './AppState';
import { handleActions } from 'redux-actions';
import { GENERATE_MAP, GENERATE_PLAYERS, MOVE_CAMERA, NEXT_TURN, MAYBE_MOVE_BY } from './actions';
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
    mapWidth: 30,
    mapHeight: 30,
    playersAmount: 8,
    camera: {
        x: 0,
        y: 0,
        zoom: 1,
    },
    selectedUnitIndex: 0,
};


export default handleActions<AppState, any>({
    [GENERATE_MAP]: state => assign({}, state, {
        tiles: generateTiles({ width: state.mapWidth, height: state.mapHeight }),
    }),

    [GENERATE_PLAYERS]: state => {
        const players = generatePlayers({ tiles: state.tiles, playersAmount: state.playersAmount })
            .map(p => assign({}, p, {
                seenTiles: getSurroundingTiles(state.tiles, p.units.map(u => u.tile), state.mapWidth, state.mapHeight),
            }));

        console.log(players);

        const currentPlayer = players[0];
        const selectedUnit = currentPlayer.units[0];
        const firstUnitTile = getTilePosition(selectedUnit.tile);

        return assign({}, state, {
            selectedUnitIndex: 0,
            players,
            currentPlayer,
            camera: assign({}, state.camera, {
                x: firstUnitTile.left,
                y: firstUnitTile.top,
            }),
        });
    },

    [MOVE_CAMERA]: (state, action) => assign({}, state, {
        camera: assign({}, state.camera, {
            x: state.camera.x + action.payload.x,
            y: state.camera.y + action.payload.y,
        }),
    }),

    [NEXT_TURN]: state => {
        const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.playersAmount;
        const nextPlayer = state.players[nextPlayerIndex];
        const selectedUnit = nextPlayer.units[0];
        const firstUnitTile = getTilePosition(selectedUnit.tile);

        return assign({}, state, {
            selectedUnitIndex: 0,
            currentPlayerIndex: nextPlayerIndex,
            turn: state.turn + (nextPlayerIndex === 0 ? 1 : 0),
            camera: assign({}, state.camera, {
                x: firstUnitTile.left,
                y: firstUnitTile.top,
            }),
        });
    },

    [MAYBE_MOVE_BY]: (state, action) => {
        // TODO - check if unit can move
        const currentPlayer = state.players[state.currentPlayerIndex];

        const currentPlayerAfterMovedUnit = assign({}, currentPlayer, {
            units: currentPlayer.units.map((u, index) => index === state.selectedUnitIndex ?
                assign({}, u, {
                    tile: action.payload.tile,
                }) : u
            ),
        });

        const currentPlayerAfterSeenTiles = assign({}, currentPlayerAfterMovedUnit, {
            seenTiles: uniq([
                ...currentPlayer.seenTiles,
                ...getSurroundingTiles(
                    state.tiles,
                    currentPlayerAfterMovedUnit.units.map(u => u.tile),
                    state.mapWidth,
                    state.mapHeight
                ),
            ]),
        });

        const players = state.players
            .map((p, index) => index === state.currentPlayerIndex ? currentPlayerAfterSeenTiles : p);

        return assign({}, state, { players });
    },

}, initialState);
