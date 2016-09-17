import * as React from 'react';
import { Tile } from '../../AppState';
import { getTileCameraPosition } from '../../utils';
import { Hex } from './Hex';

interface TileContentProps {
    tile: Tile;
    scale: number;
    onMouseLeave(): void;
    onContextMenu(): void;
    onClick(): void;
    onMouseEnter(): void;
}

export class TileComponent extends React.Component<TileContentProps, {}> {
    public render() {
        const { tile, onContextMenu, onClick, onMouseEnter, scale, onMouseLeave, } = this.props;
        const { left, top } = getTileCameraPosition(tile.id, scale);

        return (
            <g {...{ onMouseEnter, onClick, onContextMenu, onMouseLeave }}
                className='tile'
                transform={'translate(' + left + ', ' + top + ')'}>
                <Hex scale={scale} pattern={tile.type} />
            </g>
        );
    }
};
