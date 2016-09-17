import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Tile, Player, Unit } from '../../../AppState';
import { getTileCameraPosition, getUnitFromTile, getTileById, createCssTransformMatrix } from '../../../utils';
import { TILE_WIDTH, TILE_HEIGHT } from '../../../constants';
import { Fade, DelayAnimator } from '../../animations';
import { Transform } from '../Transform';
import { UnitTooltip } from './UnitTooltip';
import { TileTooltip } from './TileTooltip';

import './tooltip.scss';

interface TooltipProps {
    zoom: number;
    hoveredTile: Tile;
    tileOwner: Player | null;
    unit: Unit | null;
}

class _Tooltip extends React.Component<TooltipProps, { show: boolean }> {
    public constructor() {
        super();
        this.state = { show: false };
    }
    public componentWillReceiveProps(props: TooltipProps) {
        if (props.hoveredTile !== this.props.hoveredTile)
            this.setState({ show: true });
    }

    public render() {
        const { hoveredTile } = this.props;
        const { show } = this.state;

        return (
            <DelayAnimator show={show && !!hoveredTile} appearDelay={1000} Animator={Fade as any}>
                {hoveredTile && this.renderTooltip()}
            </DelayAnimator>
        );
    }

    private renderTooltip() {
        const { zoom, hoveredTile, tileOwner, unit } = this.props;

        const tilePosition = getTileCameraPosition(hoveredTile.id, zoom);

        const tooltipHeight = 150;
        const tooltipWidth = 200;

        const transform = {
            left: tilePosition.left + (TILE_WIDTH * zoom - tooltipWidth) / 2,
            top: tilePosition.top - tooltipHeight - 25,
            zoom: 1,
        };

        return (
            <Transform {...transform} key='#0'>
                <polygon className='tooltip-triangle' points='0,0 50,0 25,22'
                    transform={createCssTransformMatrix({ top: tooltipHeight, left: tooltipWidth / 2 - 25 })} />

                {/* TODO: http://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text */}
                <foreignObject x={0} y={0} width={tooltipWidth} height={tooltipHeight} className='tooltip'>
                    <div className='container'>

                        {unit && <UnitTooltip unit={unit} />}

                        <TileTooltip tile={hoveredTile} owner={tileOwner} />

                    </div>
                </foreignObject>
            </Transform >
        );
    }
}


export const Tooltip = connect(
    (state: AppState) => {
        const hoveredTile = getTileById(state.tiles, state.hoveredTileIndex);
        const tileOwner = hoveredTile ? state.players[hoveredTile.ownerId] : null;
        const unit = getUnitFromTile(state.players, state.hoveredTileIndex);
        return {
            zoom: state.camera.zoom,
            hoveredTile,
            unit,
            tileOwner,
        };
    }
)(_Tooltip);

