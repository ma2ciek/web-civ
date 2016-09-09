import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Tile, Player, Camera, Unit } from './AppState';
import { generatePlayers, generateMap, moveCamera, nextTurn, maybeMoveTo } from './actions';
import { getTilePosition, isTileVisible, TILE_WIDTH, TILE_HEIGHT } from './Tile';

interface AppProps {
    dispatch: Function;
    tiles: Tile[];
    players: Player[];
    camera: Camera;
    currentPlayerIndex: number;
    turn: number;
    selectedUnitIndex: number
}

const MAP_SPEED = 10;

export const TileComponent = ({ tile, className, onClick }) => (
    <svg onClick={onClick} className={ className } viewBox='0 20 300 280' width={TILE_WIDTH} style={ getTilePosition(tile) }>
        <polygon points="300,150 225,280 75,280 0,150 75,20 225,20"></polygon>
    </svg>
)

class App extends React.Component<AppProps, {}> {
    private mouseX: number;
    private mouseY: number;

    constructor(props: AppProps) {
        super();

        props.dispatch(generateMap());
        props.dispatch(generatePlayers());
    }

    public componentDidMount() {
        // TODO - componentWillUnmount


        document.querySelector('.map').addEventListener('mousemove', (e: MouseEvent) => {
            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
        });

        document.querySelector('.map').addEventListener('mouseleave', () => {
            this.mouseX = undefined;
            this.mouseY = undefined;
        });

        document.querySelector('.board').addEventListener('mouseleave', () => {
            this.mouseX = undefined;
            this.mouseY = undefined;
        });

        this.updatePosition();

        window.addEventListener('resize', () => this.forceUpdate());
    }

    private updatePosition() {
        let position = { x: 0, y: 0 };

        if (window.innerWidth - this.mouseX < 100)
            position.x += MAP_SPEED;

        if (window.innerHeight - this.mouseY < 100)
            position.y += MAP_SPEED;

        if (this.mouseX < 100)
            position.x -= MAP_SPEED;

        if (this.mouseY < 100)
            position.y -= MAP_SPEED;

        if (position.x || position.y) {
            this.props.dispatch(moveCamera(position))
        }

        window.requestAnimationFrame(() => this.updatePosition());
    }

    public render() {
        const { tiles, players, camera, currentPlayerIndex, dispatch, turn, selectedUnitIndex } = this.props;
        const currentPlayer = players[currentPlayerIndex];

        return (
            <div className='app'>
                <div className='map'>
                    <div className='map-content' style={{ marginLeft: -camera.x + window.innerWidth / 2 - TILE_WIDTH / 2, marginTop: -camera.y + window.innerHeight / 2 - TILE_HEIGHT / 2 }}>

                        { currentPlayer && currentPlayer.seenTiles.filter(tile => isTileVisible(tile, camera)).map(tile =>
                            <TileComponent tile={tile} key={tile.id} className='tile' onClick={ () => dispatch(maybeMoveTo(tile)) } />
                        ) }

                        { players.map(player =>
                            player.units.filter(unit => currentPlayer.seenTiles.map(t => t.id).indexOf(unit.tile.id) > -1).map(unit => {
                                const className = 'unit' + (player === currentPlayer ? ' my-unit' : '');
                                return <TileComponent tile={unit.tile} key={unit.tile.id} className={className} onClick={() => { } }/>;
                            })
                        ) }
                    </div>
                </div>

                <div className='board'>
                    <span>{ 'currentPlayer: ' + (currentPlayer && currentPlayer.id) }</span>
                    <span>{ 'Turn: ' + turn }</span>
                    <button onClick={ () => dispatch(nextTurn()) }> Next turn</button>

                    <span>{ 'Selected unit: ' + (selectedUnitIndex && currentPlayer.units[selectedUnitIndex].name) }</span>
                </div>

            </div>
        );
    }


}

export default connect(
    (state: AppState) => ({
        selectedUnitIndex: state.selectedUnitIndex,
        currentPlayerIndex: state.currentPlayerIndex,
        tiles: state.tiles,
        players: state.players,
        camera: state.camera,
        turn: state.turn,
    })
)(App);