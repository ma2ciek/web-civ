import * as React from 'react';
import { connect } from 'react-redux';
import { generatePlayers, generateMap } from './actions';
import { TopMenu } from './gui/TopMenu';
import { AnimatedMap } from './map/AnimatedMap';
import { UnitMenu } from './gui/UnitMenu';

interface AppProps {
    dispatch: Function;
}

class App extends React.Component<AppProps, {}> {
    constructor(props: AppProps) {
        super();

        props.dispatch(generateMap());
        props.dispatch(generatePlayers());
    }

    public render() {
        return (
            <div className='app'>
                <AnimatedMap />
                <TopMenu />
                <UnitMenu />
            </div>
        );
    }
}

export default connect(
    () => ({})
)(App);
