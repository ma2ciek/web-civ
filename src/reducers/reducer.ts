import * as actions from '../actions';
import { AppState } from '../AppState';
import { createPlayers, nextTurn } from './player';
import { generateTiles } from '../generators';
import { handleActions } from 'redux-actions';
import { maybeMoveBy, createCity, meleeAttack, distanceAttack } from './unit';
import { moveCamera, zoomMap, hoverTile } from './camera';
import { selectUnit, deselect, selectTown, nextSelection } from './selection';

export const initialState: AppState = {
    tiles: generateTiles(), // TODO
    players: [],
    turn: 0,
    currentPlayerIndex: 0,
    camera: {
        left: 0,
        top: 0,
        zoom: 0.3,
    },
    selection: null,
    hoveredTileIndex: 0,
};

export default handleActions<AppState, {}>({
    [actions.GENERATE_PLAYERS]: createPlayers,
    [actions.NEXT_TURN]: nextTurn,

    [actions.DESELECT]: deselect,
    [actions.SELECT_UNIT]: selectUnit,
    [actions.SELECT_TOWN]: selectTown,
    [actions.NEXT_SELECTION]: nextSelection,

    [actions.MAYBE_MOVE_BY]: maybeMoveBy,
    [actions.CREATE_CITY]: createCity,
    [actions.DISTANCE_ATTACK]: distanceAttack,
    [actions.MELEE_ATTACK]: meleeAttack,

    [actions.ZOOM_MAP]: zoomMap,
    [actions.MOVE_CAMERA]: moveCamera,
    [actions.HOVER_TILE]: hoverTile,
}, initialState);
