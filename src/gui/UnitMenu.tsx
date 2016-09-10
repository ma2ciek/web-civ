import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Unit } from '../AppState';
import { IconHome } from '../icons';
import { createCity } from '../actions';

const SettlerOptions = ({ dispatch }) => {
    return (
        <div className='settler-options'>

            <div className='option'>
                <a onClick={() => dispatch(createCity()) }>
                    <IconHome/>
                </a>
            </div>

        </div >
    );
};


interface UnitMenuProps {
    selectedUnit: Unit;
    dispatch: Function;
}

class _UnitMenu extends React.Component<UnitMenuProps, {}> {
    public render() {
        const { selectedUnit } = this.props;
        if (!selectedUnit)
            return null;

        return (
            <div className='unit-side-menu'>
                <h2>{ selectedUnit.name.toUpperCase() }</h2>
                <div className='unit-options'>
                    { this.renderOptions() }
                </div>
            </div>
        );

    };

    private renderOptions() {
        const { selectedUnit } = this.props;

        switch (selectedUnit.name) {
            case 'settler':
                return <SettlerOptions dispatch={this.props.dispatch}/>;
            default:
                return null;
        }
    }
}

export const UnitMenu = connect(
    (state: AppState) => ({
        selectedUnit: state.selected.type === 'unit' && state.players[state.currentPlayerIndex].units
            .filter(unit => unit.id === state.selected.id)[0],
    })
)(_UnitMenu);

