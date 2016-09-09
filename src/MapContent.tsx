import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Player, Camera } from './AppState';
import { maybeMoveCurrentUnit } from './actions';
import { getTilePosition, isTileVisible, TILE_WIDTH, TILE_HEIGHT } from './Tile';

interface MapContentProps {
    camera: Camera;
    dispatch: Function;
    players: Player[];
    currentPlayerIndex: number;
}

export const TileComponent = ({ tile, className, onClick }) => (
    <svg onClick={onClick} className={ className } viewBox='0 20 300 280' width={TILE_WIDTH} style={ getTilePosition(tile) }>
        <polygon points='300,150 225,280 75,280 0,150 75,20 225,20'></polygon>
    </svg>
);

const _MapContent = ({ camera, players, currentPlayerIndex, dispatch }: MapContentProps) => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer)
        return null;

    return (
        <div className='map-content' style={{
            marginLeft: -camera.x + window.innerWidth / 2 - TILE_WIDTH / 2,
            marginTop: -camera.y + window.innerHeight / 2 - TILE_HEIGHT / 2,
        }}>
            <FadeAnimate>
                { currentPlayer && currentPlayer.seenTiles.filter(tile => isTileVisible(tile, camera)).map(tile =>
                    <TileComponent tile={tile} key={tile.id} className='tile' onClick={ () => dispatch(maybeMoveCurrentUnit(tile)) } />
                ) }
            </FadeAnimate>

            { players.map(player =>
                player.units.filter(unit => currentPlayer.seenTiles.map(t => t.id).indexOf(unit.tile.id) > -1).map(unit => {
                    const className = 'unit' + (player === currentPlayer ? ' my-unit' : '');
                    return <TileComponent tile={unit.tile} key={unit.tile.id} className={className} onClick={() => { } }/>;
                })
            ) }
        </div>
    );
};

export const MapContent = connect(
    (state: AppState) => ({
        currentPlayerIndex: state.currentPlayerIndex,
        players: state.players,
        camera: state.camera,
    })
)(_MapContent);

class FadeAnimate extends React.Component<{}, {}> {
    public render() {
        return (
            <React.addons.CSSTransitionGroup
                transitionName='fade'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                { this.props.children }
            </React.addons.CSSTransitionGroup>
        );
    }
} 