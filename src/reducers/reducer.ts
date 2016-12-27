import * as actions from '../actions';

import { createCityHandler, distanceAttackHandler, maybeMoveByHandler, meleeAttackHandler } from './unit';
import { createPlayersHandler, nextTurnHandler } from './player';
import { deselectHandler, nextSelectionHandler, selectTownHandler, selectUnitHandler } from './selection';
import { hoverTileHandler, moveCameraHandler, zoomMapHandler } from './camera';

import { AppState } from '../AppState';
import { createTilesHandler } from './map';
import { handleActions } from 'redux-actions';

export const initialState: AppState = {
    tiles: [],
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
    seed: 0,
};


export default handleActions<AppState, {}>({
    [actions.GENERATE_PLAYERS]: createPlayersHandler,
    [actions.GENERATE_TILES]: createTilesHandler,
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
