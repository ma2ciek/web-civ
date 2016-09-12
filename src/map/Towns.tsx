import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Selection } from '../AppState';
import { selectTown } from '../actions';
import { TownComponent } from './TownComponent';

interface TownsProps {
    players: Player[];
    currentPlayerIndex: number;
    zoom: number;
    selected: Selection;
    dispatch: Function;
}

export function _Towns({ players, currentPlayerIndex, zoom, selected, dispatch }: TownsProps) {
    const currentPlayer = players[currentPlayerIndex];

    const towns = players.map((player, playerIndex) =>
        player.towns
            .filter(town => currentPlayer.seenTileIds.indexOf(town.tileId) > -1)
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
    );

    return <g className='towns'>{ towns }</g>;
}

export const Towns = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        selected: state.selection,
        zoom: state.camera.zoom,
    })
)(_Towns);

