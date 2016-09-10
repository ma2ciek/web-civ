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

const KnightPattern = () => (
    <defs>
        <pattern id='warrior' patternUnits='userSpaceOnUse' width='300' height='300'>
            <image xlinkHref='images/warrior.png' x='50' y='50' width='200' height='200' />
        </pattern>
    </defs>
);


const SettlerPattern = () => (
    <defs>
        <pattern id='settler' patternUnits='userSpaceOnUse' width='300' height='300'>
            <image xlinkHref='images/settler.png' x='50' y='50' width='200' height='200' />
        </pattern>
    </defs>
);


const mapUnitNameToPattern: { [name: string]: () => JSX.Element } = {
    warrior: KnightPattern,
    settler: SettlerPattern,
};


export const UnitComponent = ({ unit, onContextMenu, onClick, color, selected }: UnitComponentProps) => {
    const Pattern = mapUnitNameToPattern[unit.name];

    return (
        <svg onContextMenu={() => onContextMenu()} onClick={() => onClick()}
            className={'unit' + (selected ? ' selected-unit' : '')}
            viewBox='0 20 300 260'
            width={TILE_WIDTH}
            style={getTilePosition(unit.tile)}>

            <Pattern />

            <polygon
                points='300,150 225,280 75,280 0,150 75,20 225,20'
                fill={'url(#' + unit.name + ')'}>
            </polygon>
        </svg >
    );
}