import { Position, AppState, ZoomEvent } from '../AppState';
import { Action } from 'redux-actions';
import { merge } from '../utils';

export function zoomMapHandler(state: AppState, action: Action<ZoomEvent>) {
    if (!action.payload)
        return state;

    const zoomDelta = action.payload.delta * 0.03;

    const left = state.camera.left + (action.payload.x + state.camera.left) * zoomDelta;
    const top = state.camera.top + (action.payload.y + state.camera.top) * zoomDelta;
    const zoom = state.camera.zoom * (1 + zoomDelta);

    return merge(state, {
        camera: merge(state.camera, { zoom, left, top }),
    });
}

export function moveCameraHandler(state: AppState, action: Action<Position>) {
    if (!action.payload) return state;

    return merge(state, {
        camera: merge(state.camera, {
            left: state.camera.left + action.payload.left,
            top: state.camera.top + action.payload.top,
        }),
    });
}


export function hoverTileHandler(state: AppState, action: Action<number>) {
    return merge(state, {
        hoveredTileIndex: action.payload,
    });
}
