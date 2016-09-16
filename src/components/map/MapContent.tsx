import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Camera } from '../../AppState';
import { TILE_WIDTH, TILE_HEIGHT } from '../../constants';
import { Patterns } from './Patterns';
import { Units } from './Units';
import { Towns } from './Towns';
import { Tiles } from './Tiles';
import { SelectedUnitMovement } from './SelectedUnitMovement';
import { Tooltip } from './Tooltip';

interface MapContentProps {
    camera: Camera;
    currentPlayer: Player;
}

function _MapContent({ camera, currentPlayer }: MapContentProps) {
    const transform = (
        'translate(' +
        (-camera.left + window.innerWidth / 2 - TILE_WIDTH * camera.zoom / 2) + ' ' +
        (-camera.top + window.innerHeight / 2 - TILE_HEIGHT * camera.zoom / 2) + ')'
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

