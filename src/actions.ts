import { createAction } from 'redux-actions';

export const GENERATE_MAP = 'GENERATE_MAP';
export const GENERATE_PLAYERS = 'GENERATE_PLAYERS';
export const MOVE_CAMERA = 'MOVE_CAMERA';
export const NEXT_TURN = 'NEXT_TURN';
export const MAYBE_MOVE_TO = 'MAYBE_MOVE_TO';

export const generateMap = createAction(GENERATE_MAP);
export const generatePlayers = createAction(GENERATE_PLAYERS);
export const moveCamera = createAction(
    MOVE_CAMERA,
    ({ x, y }) => ({ x, y })
);

export const nextTurn = createAction(NEXT_TURN);
export const maybeMoveTo = createAction(MAYBE_MOVE_TO, tile => ({ tile }));