import * as React from 'react';
import { getTilePosition, TILE_WIDTH } from '../Tile';
import { Town } from '../AppState';
import { assign } from 'lodash';

interface TownComponentProps {
    town: Town;
    color: string;
    selected: boolean;
    onClick(): void;
    onContextMenu(): void;
}


const TownPattern = () => (
    <defs>
        <pattern id='middle-age-city' patternUnits='userSpaceOnUse' width='300' height='300'>
            <image xlinkHref='images/middle-age-city.jpg' x='0' y='0' width='300' height='300' />
        </pattern>
    </defs>
);

export const TownComponent = ({ town, onContextMenu, onClick, color, selected }: TownComponentProps) => (
    <svg onContextMenu={() => onContextMenu()} onClick={() => onClick()}
        className={'town' + (selected ? ' selected-Town' : '')}
        viewBox='0 20 300 260'
        width={TILE_WIDTH * 9 / 10}
        style={assign({}, getTilePosition(town.tile), { padding: TILE_WIDTH * 1 / 20 })}>

        <TownPattern />

        <polygon
            points='300,150 225,280 75,280 0,150 75,20 225,20'
            fill='url(#middle-age-city)'></polygon>
        <text fontSize={40} alignmentBaseline='middle' x='50%' y='50%' textAnchor='middle' fill='black'>{town.name}</text>;
    </svg >
);