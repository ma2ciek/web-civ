import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Camera } from '../AppState';
import { TILE_WIDTH, TILE_HEIGH } from '../constants';
import { Patterns } from './Patterns';
import { Units } from './Units';
import { Towns } from './Towns';
import { Tiles } from './Tiles';
import { SelectedUnitMovement } from './SelectedUnitMovement';

interface MapContentProps {
    camera: Camera;
    players: Player[];
    currentPlayerIndex: number;
}

function _MapContent({ camera, players, currentPlayerIndex }: MapContentProps) {
    const currentPlayer = players[currentPlayerIndex];

    const transform = (
        'translate(' +
        (-camera.left + window.innerWidth / 2 - TILE_WIDTH * camera.zoom / 2) + ' ' +
        (-camera.top + window.innerHeight / 2 - TILE_HEIGH * camera.zoom / 2) + ')'
    );

    if (!currentPlayer)
        return null;

    return (
        <svg width='100%' height='100vh'>
            <Patterns />

            <g transform={transform}>
                <Tiles />
                <Towns />
                <Units />
                <SelectedUnitMovement />
            </g>
        </svg>
    );
};

export const MapContent = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        camera: state.camera,
    })
)(_MapContent);

