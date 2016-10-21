import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Unit } from '../../AppState';
import { IconHome } from '../icons';
import { createCity } from '../../actions';
import { getSelectedUnit } from '../../utils';

import './unit-menu.scss';

interface UnitOptionsProps {
    dispatch: Function;
}

const SettlerOptions = ({ dispatch }: UnitOptionsProps) => {
    return (
        <div className='settler-options'>

            <div className='option'>
                <a onClick={() => dispatch(createCity())}>
                    <IconHome />
                </a>
            </div>

        </div >
    );
};


interface UnitMenuProps extends UnitOptionsProps {
    selectedUnit: Unit;
}

class _UnitMenu extends React.Component<UnitMenuProps, {}> {
    public render() {
        const { selectedUnit } = this.props;
        if (!selectedUnit)
            return null;

        return (
            <div className='unit-side-menu'>
                <h2>{selectedUnit.name.toUpperCase()}</h2>
                <div>{'Movement: ' + selectedUnit.movementLeft + '/' + selectedUnit.movement}</div>
                <div>{'Hp: ' + selectedUnit.hpLeft + '/' + selectedUnit.hp}</div>
                {typeof selectedUnit.meleeDamage === 'number' && <div>{'Melee dmg: ' + selectedUnit.meleeDamage}</div>}
                {typeof selectedUnit.experience === 'number' && <div>{'Exp: ' + selectedUnit.experience}</div>}
                <div className='unit-options'>
                    {this.renderOptions()}
                </div>
            </div>
        );
    };

    private renderOptions() {
        const { selectedUnit } = this.props;

        switch (selectedUnit.name) {
            case 'settler':
                return <SettlerOptions dispatch={this.props.dispatch} />;
            default:
                return null;
        }
    }
}

export const UnitMenu = connect(
    (state: AppState) => ({
        selectedUnit: getSelectedUnit(state),
    })
)(_UnitMenu);

