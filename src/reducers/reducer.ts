import * as actions from '../actions';
import { AppState } from '../AppState';
import { createPlayersHandler, nextTurnHandler } from './player';
import { generateTiles } from '../generators';
import { handleActions } from 'redux-actions';
import { maybeMoveByHandler, createCityHandler, meleeAttackHandler, distanceAttackHandler } from './unit';
import { moveCameraHandler, zoomMapHandler, hoverTileHandler } from './camera';
import { selectUnitHandler, deselectHandler, selectTownHandler, nextSelectionHandler } from './selection';

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
    [actions.GENERATE_PLAYERS]: createPlayersHandler,
    [actions.NEXT_TURN]: nextTurnHandler,

    [actions.DESELECT]: deselectHandler,
    [actions.SELECT_UNIT]: selectUnitHandler,
    [actions.SELECT_TOWN]: selectTownHandler,
    [actions.NEXT_SELECTION]: nextSelectionHandler,

    [actions.MAYBE_MOVE_BY]: maybeMoveByHandler,
    [actions.CREATE_CITY]: createCityHandler,
    [actions.DISTANCE_ATTACK]: distanceAttackHandler,
    [actions.MELEE_ATTACK]: meleeAttackHandler,

    [actions.ZOOM_MAP]: zoomMapHandler,
    [actions.MOVE_CAMERA]: moveCameraHandler,
    [actions.HOVER_TILE]: hoverTileHandler,
}, initialState);
