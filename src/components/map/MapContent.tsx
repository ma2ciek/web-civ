import * as React from 'react';

import { AppState, Camera, Player } from '../../AppState';

import { Patterns } from './Patterns';
import { SelectedUnitMovement } from './SelectedUnitMovement';
import { Tiles } from './Tiles';
import { Tooltip } from './tooltip/Tooltip';
import { Towns } from './Towns';
import { Units } from './Units';
import { connect } from 'react-redux';

interface MapContentProps {
    camera: Camera;
    currentPlayer: Player;
}

function _MapContent({ camera, currentPlayer }: MapContentProps) {
    const transform = (
        'translate(' +
        (-camera.left + window.innerWidth / 2) + ' ' +
        (-camera.top + window.innerHeight / 2) + ')'
    );

    if (!currentPlayer)
        return <svg></svg>;

    return (
        <svg width='100%' height='100vh'>
            <Patterns />

            <g transform={transform}>
                <Tiles />
                <Towns />
                <Units />
                <SelectedUnitMovement />
                <Tooltip />
            </g>
        </svg>
    );
};

export const MapContent = connect(
    (state: AppState) => ({
        currentPlayer: state.players[state.currentPlayerIndex],
        camera: state.camera,
    })
)(_MapContent);

