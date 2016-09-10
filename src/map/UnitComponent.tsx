import * as React from 'react';
import { getTilePosition, TILE_WIDTH } from '../Tile';
import { Unit } from '../AppState';
import { assign } from 'lodash';

interface UnitComponentProps {
    unit: Unit;
    onContextMenu(): void;
    onClick(): void;
    color: string;
    selected: boolean;
}

export const UnitComponent = ({ unit, onContextMenu, onClick, color, selected }: UnitComponentProps) => (
    <svg onContextMenu={() => onContextMenu()} onClick={() => onClick()}
        className={'unit' + (selected ? ' selected-unit' : '')}
        viewBox='0 20 300 260'
        fill={color}
        width={TILE_WIDTH * 9 / 10}
        style={assign({}, getTilePosition(unit.tile), { padding: TILE_WIDTH * 1 / 20 })}>
        <polygon points='300,150 225,280 75,280 0,150 75,20 225,20'></polygon>
        <text fontSize={50} alignmentBaseline='middle' x='50%' y='50%' textAnchor='middle' fill={'black'}>{unit.name}</text>;
    </svg >
);