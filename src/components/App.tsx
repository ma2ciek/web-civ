import * as React from 'react';
import { connect } from 'react-redux';
import { TopMenu } from './gui/TopMenu';
import { AnimatedMap } from './map/AnimatedMap';
import { UnitMenu } from './gui/UnitMenu';
import { BottomMenu } from './gui/BottomMenu';

interface AppProps {
    dispatch: Function;
}

class App extends React.Component<AppProps, {}> {
    public render() {
        return (
            <div className='app'>
                <TopMenu />
                <div style={{ display: 'flex' }}>
                    <AnimatedMap />
                    <UnitMenu />
                </div>
                <BottomMenu />
            </div>
        );
    }
}

export default connect(null, null)(App);