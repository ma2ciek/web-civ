import { STORAGE_KEY } from './constants';
import { Store, applyMiddleware } from 'redux';
import { AppState } from './AppState';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import { generatePlayers } from './actions';
import * as promise from 'redux-promise';
import * as createLogger from 'redux-logger';

declare const localforage: any;
declare const process: any;

export function configureStore(): Promise<Store<AppState>> {
    return localforage.getItem(STORAGE_KEY).then((data: AppState) => {

        const middlewares = [
            (promise as any),
          //  createLogger(),
        ];

        const store = data ?
            createStore(reducer, data, applyMiddleware(...middlewares)) :
            createStore(reducer, applyMiddleware(...middlewares));

        if (!data) {
            store.dispatch(generatePlayers());
        }

        (window as any).getState = store.getState;

        store.subscribe(() => {
            const state = store.getState();
            localforage.setItem(STORAGE_KEY, state);
        });

        return store;
    });
}
