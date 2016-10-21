import { AppState, Selection, Unit } from '../AppState';
import { Action } from 'redux-actions';
import * as utils from '../utils';

export function deselectHandler(state: AppState) {
    return state;
}

export function selectUnitHandler(state: AppState, action: Action<Unit>) {
    return utils.merge(state, {
        selection: {
            type: 'unit',
            id: (action.payload as Unit).id,
        } as Selection | null,
    });
}

export function selectTownHandler(state: AppState, action: Action<{ id: string }>) {
    return utils.merge(state, {
        selection: {
            type: 'town',
            id: (action.payload as any).id,
        } as Selection | null,
    });
}

export function nextSelectionHandler(state: AppState) {
    let nextSelection = utils.getNextSelection(state);
    if (!nextSelection)
        return state;

    const camera = utils.getSelectedTilePosition(state, nextSelection);

    return utils.merge(state, {
        selection: nextSelection as Selection | null,
        camera: utils.merge(state.camera, camera),
    });
}