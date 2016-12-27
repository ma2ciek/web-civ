import * as createLogger from 'redux-logger';
import * as promise from 'redux-promise';

import { Store, applyMiddleware, compose } from 'redux';
import { generatePlayers, generateTiles } from './actions';

import { AppState } from './AppState';
import { STORAGE_KEY } from './constants';
import { createStore } from 'redux';
import reducer from './reducers/reducer';

declare const localforage: any;
declare const process: any;

const _window = window as any;
const composeEnhancers = _window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(): Promise<Store<AppState>> {
    return localforage.getItem(STORAGE_KEY).then((data: AppState) => {

        const middlewares = [
            (promise as any),
            //  createLogger(),
        ];

        const exhancer = composeEnhancers(
            applyMiddleware(...middlewares)
        );

        const store = data ?
            createStore(reducer, data, exhancer) :
            createStore(reducer, exhancer);

        if (!data) {
            store.dispatch(generateTiles());
            store.dispatch(generatePlayers());
        }

        _window.getState = store.getState;

        store.subscribe(() => {
            const state = store.getState();
            localforage.setItem(STORAGE_KEY, state);
        });

        return store;
    });
}
