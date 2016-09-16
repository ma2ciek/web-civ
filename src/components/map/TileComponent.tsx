import * as React from 'react';
import { Tile } from '../../AppState';
import { getTileCameraPosition } from '../../utils';
import { Hex } from './Hex';

interface TileContentProps extends React.SVGAttributes<{}> {
    tile: Tile;
    scale: number;
    hovered: boolean;
    onContextMenu(): void;
    onClick(): void;
    onMouseEnter(): void;
}

export class TileComponent extends React.Component<TileContentProps, {}> {
    public render() {
        const { tile, onContextMenu, onClick, onMouseEnter, scale, hovered } = this.props;
        const { left, top } = getTileCameraPosition(tile.id, scale);

        return (
            <g
                onMouseEnter={() => onMouseEnter()}
                onContextMenu={() => onContextMenu()}
                onClick={() => onClick()}
                className='tile'
                transform={'translate(' + left + ', ' + top + ')'}>
                <Hex scale={scale} pattern={tile.type} />
            </g>
        );
    }
};
