import { createAction } from 'redux-actions';

export const GENERATE_MAP = 'GENERATE_MAP';
export const GENERATE_PLAYERS = 'GENERATE_PLAYERS';
export const MOVE_CAMERA = 'MOVE_CAMERA';
export const NEXT_TURN = 'NEXT_TURN';
export const MAYBE_MOVE_BY = 'MAYBE_MOVE_BY';

export const generateMap = createAction(GENERATE_MAP);
export const generatePlayers = createAction(GENERATE_PLAYERS);
export const moveCamera = createAction<{ x: number, y: number }>(
    MOVE_CAMERA,
    ({ x, y }) => ({ x, y })
);

export const nextTurn = createAction(NEXT_TURN);
export const maybeMoveCurrentUnit = createAction(MAYBE_MOVE_BY, tile => ({ tile }));
