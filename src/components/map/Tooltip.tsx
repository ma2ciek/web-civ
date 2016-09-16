import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Tile, Player } from '../../AppState';
import { getTileCameraPosition, getTileById, createCssTransformMatrix, toUpperCaseFirstLetter } from '../../utils';
import { TILE_WIDTH, TILE_HEIGHT } from '../../constants';
import * as classnames from 'classnames';

import '../fade.scss';
import './tooltip.scss';

interface TooltipProps {
    zoom: number;
    hoveredTile: Tile;
    tileOwner: Player | null;
}

class _Tooltip extends React.Component<TooltipProps, { active: boolean }> {
    private timer: number;
    private animator: SVGElement;

    public constructor() {
        super();
        this.state = { active: false };
    }

    public componentWillMount() {
        this.showTooltipAfterTimeout();
    }

    public componentWillReceiveProps(props: TooltipProps) {
        if (props.hoveredTile !== this.props.hoveredTile) {
            this.setState({ active: false });
            this.showTooltipAfterTimeout();
        }
    }

    private showTooltipAfterTimeout() {
        clearTimeout(this.timer);
        (this as any).timer = setTimeout(() => {
            this.setState({ active: true });
        }, 1500);
    }

    public componentWillUnmount() {
        clearTimeout(this.timer);
    }

    public render() {
        const { zoom, hoveredTile, tileOwner } = this.props;
        const tilePosition = getTileCameraPosition(hoveredTile.id, zoom);
        const tooltipPosition = {
            left: tilePosition.left - TILE_WIDTH / 2 * zoom,
            top: tilePosition.top - TILE_HEIGHT * zoom,
        };

        const tileType = toUpperCaseFirstLetter(hoveredTile.type);
        const tooltipColor = 'rgba(0,0,0,0.8)';

        return (
            <g className={classnames('fade-enter', {
                'fade-enter-active': this.state.active,
            })}>
                {this.state.active && (
                    <g transform={createCssTransformMatrix(tooltipPosition, zoom)}>

                        <polygon fill={tooltipColor} points='0,0 50,0 25.0,22.0'
                            transform={createCssTransformMatrix({ top: TILE_HEIGHT, left: TILE_WIDTH })} />

                        <foreignObject x={0} y={0} width={TILE_WIDTH * 2} height={TILE_HEIGHT} fontSize='200%' className='tooltip'>
                            <h1>{tileType}</h1>
                            <p>ID: {hoveredTile.id}</p>
                            <p>Owner: {!tileOwner ? 'none' : tileOwner.nation}</p>
                        </foreignObject>
                    </g>
                )}
            </g>
        );
    }
}

export const Tooltip = connect(
    (state: AppState) => {
        const hoveredTile = getTileById(state.tiles, state.hoveredTileIndex);
        const tileOwner = state.players[hoveredTile.ownerId] as Player | null;

        return {
            zoom: state.camera.zoom,
            hoveredTile,
            tileOwner
        };
    }
)(_Tooltip);

