import * as React from 'react';
import { Unit } from '../../../AppState';
import { toUpperCaseFirstLetter } from '../../../utils';

interface UnitTooltipProps {
    unit: Unit;
}

export const UnitTooltip = ({ unit }: UnitTooltipProps) => {
    const upperCaseUnitName = toUpperCaseFirstLetter(unit.name);

    return (
        <div>
            <h2>{upperCaseUnitName}</h2>
            <p>HP: {unit.hpLeft}/{unit.hp}</p>
            <p>Owner: {unit.ownerId}</p>
        </div>
    );
};

