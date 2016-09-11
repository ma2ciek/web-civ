import * as React from 'react';
import { getTilePosition } from '../Tile';
import { Unit } from '../AppState';
import { Hex } from './Hex';

interface UnitComponentProps {
    unit: Unit;
    selected: boolean;
    scale: number;
    onContextMenu(): void;
    onClick(): void;
}

export const UnitComponent = ({ unit, onContextMenu, onClick, selected, scale }: UnitComponentProps) => {
    const { left, top } = getTilePosition(unit.tile, scale);

    return (
        <g onContextMenu={() => onContextMenu()} onClick={() => onClick()}
            className={'unit' + (selected ? ' selected-unit' : '')}
            transform={'translate(' + left + ', ' + top + ')'}>

            <Hex scale={scale} pattern={unit.name} />
        </g>
    );
}
