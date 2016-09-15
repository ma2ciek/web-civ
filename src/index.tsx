import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { configureStore } from './configureStore';

import './app.scss';

configureStore().then((store) => {
    ReactDOM.render(
        <Provider store={store}>
            <App></App>
        </Provider>,
        document.getElementById('root')
    );
});
