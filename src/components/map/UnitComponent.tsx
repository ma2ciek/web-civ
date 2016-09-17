import * as React from 'react';
import { getTileCameraPosition } from '../../utils';
import { Unit } from '../../AppState';
import { Hex } from './Hex';
import { TILE_WIDTH, PLAYER_COLORS } from '../../constants';
import * as classnames from 'classnames';

interface UnitComponentProps {
    unit: Unit;
    selected: boolean;
    scale: number;
    meleeAttackAvailable: boolean;
    onMouseEnter(): void;
    onContextMenu(): void;
    onClick(): void;
}

export function UnitComponent({ unit, onContextMenu, onClick, onMouseEnter, selected, scale, meleeAttackAvailable }: UnitComponentProps) {
    const { left, top } = getTileCameraPosition(unit.tileId, scale);
    const color = PLAYER_COLORS[unit.ownerId];

    return (
        <g onContextMenu={() => onContextMenu()} onClick={() => onClick()} onMouseEnter={() => onMouseEnter()}
            className={classnames('unit', {
                'selected-unit': selected,
                'melee-attack': meleeAttackAvailable,
            })}
            transform={'translate(' + left + ', ' + top + ')'}>

            <Hex scale={scale} pattern={unit.name} />

            <circle
                r={20 * scale}
                cx={TILE_WIDTH * scale * 4 / 5}
                cy={TILE_WIDTH * scale * 4 / 5}
                stroke='black'
                strokeWidth={3 * scale}
                fill={color}>
            </circle>
        </g>
    );
}
