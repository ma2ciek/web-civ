import * as React from 'react';
import { connect } from 'react-redux';
import { generatePlayers, generateMap, moveCamera } from './actions';
import { BottomMenu } from './BottomMenu';
import { MapContent} from './MapContent';

interface AppProps {
    dispatch: Function;
}

class App extends React.Component<AppProps, {}> {
    private mouseDown = false;
    private mouseX: number;
    private mouseY: number;
    private settedControls = false;

    constructor(props: AppProps) {
        super();

        props.dispatch(generateMap());
        props.dispatch(generatePlayers());
    }

    public componentDidMount() {
        window.addEventListener('resize', () => this.forceUpdate());
    }

    public render() {
        return (
            <div className='app'>
                <div className='map' ref={ (map) => this.setControls(map) }>
                    <MapContent />
                </div>
                <BottomMenu />
            </div>
        );
    }

    private setControls(map: HTMLElement) {
        if (!map || this.settedControls)
            return;

        map.addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopPropagation();
        });

        map.addEventListener('mousedown', (e: MouseEvent) => {
            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
            this.mouseDown = true;
        });

        map.addEventListener('mouseup', (e: MouseEvent) => {
            this.mouseDown = false;
        });

        map.addEventListener('mousemove', (e: MouseEvent) => {
            if (!this.mouseDown)
                return;

            this.props.dispatch(moveCamera({
                x: this.mouseX - e.pageX,
                y: this.mouseY - e.pageY,
            }));

            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
        });

        this.settedControls = true;
    }
}

export default connect(
    () => ({})
)(App);
