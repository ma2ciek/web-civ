import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import App from './App';
import { AppState } from './AppState';
import { generatePlayers, generateMap } from './actions';
import { STORAGE_KEY } from './constants';
declare const localforage: LocalForage;

import './app.scss';

localforage.getItem(STORAGE_KEY).then((data: AppState) => {
    console.log(data);
    const store = data ? createStore(reducer, data) : createStore(reducer);

    if (!data) {
        store.dispatch(generateMap());
        store.dispatch(generatePlayers());
    }

    ReactDOM.render(
        <Provider store={store}>
            <App></App>
        </Provider>,
        document.getElementById('root')
    );

    (window as any).getState = store.getState;


    store.subscribe(() => {
        const state = store.getState();
        localforage.setItem(STORAGE_KEY, state);
    });
});
