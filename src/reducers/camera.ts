import { Position, AppState } from '../AppState';
import { Action } from 'redux-actions';
import { merge } from '../utils';

export function zoomMap(state: AppState, action: Action<number>) {
    const zoom = (1 + action.payload * 0.03);

    return merge(state, {
        camera: merge(state.camera, {
            zoom: state.camera.zoom * zoom,
            left: state.camera.left * zoom,
            top: state.camera.top * zoom,
        }),
    });
}

export function moveCamera(state: AppState, action: Action<{}>) {
    return merge(state, {
        camera: merge(state.camera, {
            left: state.camera.left + (action.payload as Position).left,
            top: state.camera.top + (action.payload as Position).top,
        }),
    });
}
