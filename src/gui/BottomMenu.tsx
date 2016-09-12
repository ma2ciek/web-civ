import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../AppState';
import { nextTurn, next } from '../actions';
import { IconNext, IconReload } from '../icons';
import { getNextSelection } from '../reducer';

import './bottom-menu.scss';

interface BottomMenuProps {
    dispatch: Function;
    nextSelection: boolean;
}

declare const localforage: LocalForage;

const _BottomMenu = ({ nextSelection, dispatch }: BottomMenuProps) => {
    return (
        <div className='bottom-menu'>
            { nextSelection && <div className='next'  onClick={() => dispatch(next()) } ><IconNext /></div> }
            <div className='next' onClick={() => dispatch(nextTurn()) }><IconReload /></div>
        </div>
    );
};

export const BottomMenu = connect(
    (state: AppState) => ({
        nextSelection: !!getNextSelection(state),
    })
)(_BottomMenu);
