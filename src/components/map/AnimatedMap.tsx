import * as React from 'react';
import { connect } from 'react-redux';
import { moveCamera, zoomMap } from '../../actions';
import { MapContent } from './MapContent';
import { Position, ZoomEvent } from '../../AppState';

import './map.scss';

interface AppProps {
    moveCamera: (position: Position) => void;
    zoomMap: (zoomEvent: ZoomEvent) => void;
}

class _AnimatedMap extends React.Component<AppProps, {}> {
    private mouseDown = false;
    private mouseX: number;
    private mouseY: number;

    public componentWillMount() {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('mouseenter', this.onMouseEnter);
        window.addEventListener('contextmenu', this.onContextMenu);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('mouseenter', this.onMouseEnter);
        window.removeEventListener('contextmenu', this.onContextMenu);
    }

    public render() {
        return (
            <div
                className='map'
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
                onWheel={this.onWheel}>
                <MapContent />
            </div>
        );
    }

    private onResize = () => {
        this.props.moveCamera({ left: 0, top: 0 });
    }

    private onMouseEnter = () => {
        this.mouseDown = false;
    }

    private onContextMenu = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
    }

    private onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const delta = e.deltaY / -53;

        if (delta) {
            this.props.zoomMap({
                delta,
                x: e.clientX - e.currentTarget.clientWidth / 2,
                y: e.clientY - e.currentTarget.clientHeight / 2,
            });
        }
    }

    private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.nativeEvent as any).which === 3) return;
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
        this.mouseDown = true;
        e.currentTarget.style.cursor = 'move';
    }

    private onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        this.mouseDown = false;
        e.currentTarget.style.cursor = 'default';
    }

    private onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.mouseDown) {
            this.props.moveCamera({
                left: this.mouseX - e.pageX,
                top: this.mouseY - e.pageY,
            });
        }

        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
    }
}

export const AnimatedMap = connect(
    () => ({}),
    { moveCamera, zoomMap }
)(_AnimatedMap);
