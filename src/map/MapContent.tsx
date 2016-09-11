import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Camera, Selected } from '../AppState';
import { maybeMoveCurrentUnit, selectUnit, selectTown } from '../actions';
import { isTileVisible } from '../Tile';
import { FadeAnimate } from '../animations';
import { PLAYER_COLORS, TILE_WIDTH, TILE_HEIGH } from '../constants';
import { UnitComponent } from './UnitComponent';
import { TownComponent } from './TownComponent';
import { TileComponent } from './TileComponent';
import { Patterns } from './Patterns';

interface MapContentProps {
    camera: Camera;
    dispatch: Function;
    players: Player[];
    currentPlayerIndex: number;
    selected: Selected;
    zoom: number;
}

const _MapContent = ({ camera, players, currentPlayerIndex, dispatch, selected, zoom }: MapContentProps) => {
    const currentPlayer = players[currentPlayerIndex];

    const transform = (
        'translate(' +
        (-camera.left + window.innerWidth / 2 - TILE_WIDTH * zoom / 2) + ' ' +
        (-camera.top + window.innerHeight / 2 - TILE_HEIGH * zoom / 2) + ')'
    );

    if (!currentPlayer)
        return null;

    return (
        <svg width='100%' height='100vh'>
            <Patterns />

            <g transform={transform}>
                {currentPlayer && currentPlayer.seenTiles.filter(tile => isTileVisible(tile, camera)).map(tile =>
                    <TileComponent
                        tile={tile}
                        key={tile.id}
                        scale={zoom}
                        onContextMenu={() => dispatch(maybeMoveCurrentUnit(tile)) } />
                ) }

                {players.map(player =>
                    player.units
                        .filter(unit => currentPlayer.seenTiles.map(t => t.id).indexOf(unit.tile.id) > -1)
                        .map(unit => {

                            return (
                                <UnitComponent
                                    unit={unit}
                                    scale={zoom}
                                    key={unit.id}
                                    selected={player.id === currentPlayer.id && selected.id === unit.id}
                                    onContextMenu={() => { } }
                                    onClick={() => {
                                        if (unit.ownerId === currentPlayer.id) {
                                            dispatch(selectUnit(unit));
                                        }
                                    } } />
                            );
                        })
                ) }

                {players.map((player, playerIndex) =>
                    player.towns
                        .filter(town => currentPlayer.seenTiles.map(t => t.id).indexOf(town.tile.id) > -1)
                        .map(town => {
                            return (
                                <TownComponent
                                    town={town}
                                    scale={zoom}
                                    key={town.id}
                                    selected={player.id === currentPlayer.id && selected.id === town.id}
                                    onContextMenu={() => { } }
                                    onClick={() => {
                                        if (town.ownerId === currentPlayer.id) {
                                            dispatch(selectTown(town));
                                        }
                                    } } />
                            );
                        })
                ) }
            </g>
        </svg>
    );
};

export const MapContent = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        camera: state.camera,
        selected: state.selected,
        zoom: state.camera.zoom,
    })
)(_MapContent);

