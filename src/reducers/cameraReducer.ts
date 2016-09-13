import { ZOOM_MAP, MOVE_CAMERA } from '../actions';
import { Action, handleActions } from 'redux-actions';
import { Camera } from '../AppState';
import { merge } from '../utils';

export const cameraReducer = handleActions<Camera, {}>({
    [ZOOM_MAP]: (state: Camera, action: Action<number>) => {
        const zoom = (1 + action.payload * 0.03);

        return merge(state, {
            zoom: state.zoom * zoom,
            left: state.left * zoom,
            top: state.top * zoom,
        });
    },

    [MOVE_CAMERA]: (state: Camera, action: Action<{ left: number, top: number }>) => merge(state, {
        left: state.left + action.payload.left,
        top: state.top + action.payload.top,
    }),
});