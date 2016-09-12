import * as React from 'react';
import { connect } from 'react-redux';
import { moveCamera, zoomMap } from '../actions';
import { MapContent } from './MapContent';

import './map.scss';

interface AppProps {
    dispatch: Function;
}

class _AnimatedMap extends React.Component<AppProps, {}> {
    private mouseDown = false;
    private mouseX: number;
    private mouseY: number;
    private settedControls = false;

    public render() {
        return (
            <div className='map' ref={(map) => this.setControls(map) }>
                <MapContent />
            </div>
        );
    }

    private setControls(map: HTMLElement) {
        const { dispatch } = this.props;

        if (!map || this.settedControls)
            return;

        window.addEventListener('resize', () => dispatch(moveCamera({ left: 0, top: 0 })));

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
                    dispatch(zoomMap(delta));
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

            dispatch(moveCamera({
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
