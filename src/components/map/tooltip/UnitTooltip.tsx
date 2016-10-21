import * as React from 'react';
import { Unit } from '../../../AppState';
import { toUpperCaseFirstLetter } from '../../../utils';
import { PLAYER_COLORS } from '../../../constants';

interface UnitTooltipProps {
    unit: Unit;
}

export const UnitTooltip = ({ unit }: UnitTooltipProps) => {
    const upperCaseUnitName = toUpperCaseFirstLetter(unit.name);

    return (
        <div>
            <h2>{upperCaseUnitName}</h2>
            <p>HP: {unit.hpLeft}/{unit.hp}</p>
            <p>{`Owner: ${PLAYER_COLORS[unit.ownerId]} player`}</p>
            {typeof unit.experience === 'number' && <p>Experience: {unit.experience}</p>}
        </div>
    );
};

