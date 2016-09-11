import * as React from 'react';
import { connect } from 'react-redux';
import { generatePlayers, generateMap, moveCamera, zoomMap } from '../actions';
import { MapContent } from './MapContent';

interface AppProps {
    dispatch: Function;
}

class _AnimatedMap extends React.Component<AppProps, {}> {
    private mouseDown = false;
    private mouseX: number;
    private mouseY: number;
    private settedControls = false;

    constructor(props: AppProps) {
        super();

        props.dispatch(generateMap());
        props.dispatch(generatePlayers());
    }

    public render() {
        return (
            <div className='map' ref={(map) => this.setControls(map)}>
                <MapContent />
            </div>
        );
    }

    private setControls(map: HTMLElement) {
        if (!map || this.settedControls)
            return;

        window.addEventListener('resize', () => this.forceUpdate());

        window.addEventListener('mouseenter', () => {
            this.mouseDown = false;
        });

        window.addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopPropagation();
        });


        try {
            map.addEventListener('wheel', (e) => {
                const delta = (e as any).wheelDelta / 120 || e.deltaY / -53;
                if (delta) {
                    this.props.dispatch(zoomMap(delta));
                }
            });
        } catch (err) { console.warn('wheel is not supported'); }



        map.addEventListener('mousedown', (e: MouseEvent) => {
            if (e.which === 3) return;
            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
            this.mouseDown = true;
            map.style.cursor = 'move';
        });

        map.addEventListener('mouseup', (e: MouseEvent) => {
            this.mouseDown = false;
            map.style.cursor = 'default';
        });

        map.addEventListener('mousemove', (e: MouseEvent) => {
            if (!this.mouseDown)
                return;

            this.props.dispatch(moveCamera({
                left: this.mouseX - e.pageX,
                top: this.mouseY - e.pageY,
            }));

            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
        });

        this.settedControls = true;
    }
}

export const AnimatedMap = connect(
    () => ({})
)(_AnimatedMap);
