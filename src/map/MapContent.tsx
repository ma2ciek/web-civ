import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Camera, Selected } from '../AppState';
import { maybeMoveCurrentUnit, selectUnit } from '../actions';
import { getTilePosition, isTileVisible, TILE_WIDTH, TILE_HEIGHT } from '../Tile';
import { FadeAnimate } from '../animations';
import { PLAYER_COLORS } from '../constants';
import { UnitComponent } from './UnitComponent';
import { TownComponent } from './TownComponent';

interface MapContentProps {
    camera: Camera;
    dispatch: Function;
    players: Player[];
    currentPlayerIndex: number;
    selected: Selected;
}

export const TileComponent = ({ tile, className, onContextMenu }) => (
    <svg onContextMenu={onContextMenu} className={ className } viewBox='0 20 300 280' width={ TILE_WIDTH } style={ getTilePosition(tile) }>
        <polygon points='300,150 225,280 75,280 0,150 75,20 225,20'></polygon>
    </svg>
);

const _MapContent = ({ camera, players, currentPlayerIndex, dispatch, selected }: MapContentProps) => {
    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer)
        return null;

    return (
        <div className='map-content' style={{
            marginLeft: -camera.left + window.innerWidth / 2 - TILE_WIDTH / 2,
            marginTop: -camera.top + window.innerHeight / 2 - TILE_HEIGHT / 2,
        }}>
            <FadeAnimate>
                { currentPlayer && currentPlayer.seenTiles.filter(tile => isTileVisible(tile, camera)).map(tile =>
                    <TileComponent
                        tile={tile}
                        key={tile.id}
                        className='tile'
                        onContextMenu={ () => dispatch(maybeMoveCurrentUnit(tile)) } />
                ) }
            </FadeAnimate>

            { players.map(player =>
                player.units
                    .filter(unit => currentPlayer.seenTiles.map(t => t.id).indexOf(unit.tile.id) > -1)
                    .map(unit => {

                        return (
                            <UnitComponent
                                unit={ unit }
                                key={ unit.id }
                                selected={ player.id === currentPlayer.id && selected.id === unit.id }
                                color={ PLAYER_COLORS[player.id]}
                                onContextMenu={() => { } }
                                onClick={ () => { if(unit.ownerId === currentPlayer.id) {
                                    dispatch(selectUnit(unit));
                                } } }/>
                        );
                    })
            ) }

            <FadeAnimate>
                { players.map((player, playerIndex) =>
                    player.towns
                        .filter(town => currentPlayer.seenTiles.map(t => t.id).indexOf(town.tile.id) > -1)
                        .map(town => {
                            return (
                                <TownComponent
                                    town={ town }
                                    key={ town.id }
                                    selected={ player.id === currentPlayer.id && selected.id === town.id }
                                    color={ PLAYER_COLORS[playerIndex]}
                                    onContextMenu={() => { } }/>
                            );
                        })
                ) }
            </FadeAnimate>
        </div>
    );
};

export const MapContent = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        camera: state.camera,
        selected: state.selected,
    })
)(_MapContent);

