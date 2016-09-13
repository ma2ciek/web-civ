import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../AppState';
import { nextTurn, nextSelection } from '../../actions';
import { IconNext, IconReload } from '../icons';
import { getNextSelection } from '../../utils';

import './bottom-menu.scss';

interface BottomMenuProps {
    dispatch: Function;
    nextSelectionExist: boolean;
}

const _BottomMenu = ({ nextSelectionExist, dispatch }: BottomMenuProps) => {
    return (
        <div className='bottom-menu'>
            {nextSelectionExist && <div className='next' onClick={() => dispatch(nextSelection())} ><IconNext /></div>}
            <div className='next' onClick={() => dispatch(nextTurn())}><IconReload /></div>
        </div>
    );
};

export const BottomMenu = connect(
    (state: AppState) => ({
        nextSelectionExist: !!getNextSelection(state),
    }),
    (dispatch: Function) => ({ dispatch }),
)(_BottomMenu);
