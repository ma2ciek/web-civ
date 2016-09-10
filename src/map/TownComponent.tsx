import * as React from 'react';
import { getTilePosition, TILE_WIDTH } from '../Tile';
import { Town } from '../AppState';
import { assign } from 'lodash';

interface TownComponentProps {
    town: Town;
    onContextMenu: Function;
    color: string;
    selected: boolean;
    onClick: Function;
}

export const TownComponent = ({ town, onContextMenu, onClick, color, selected }: TownComponentProps) => (
    <svg onContextMenu={onContextMenu} onClick={ onClick }
        className={ 'town' + (selected ? ' selected-Town' : '') }
        viewBox='0 20 300 260'
        fill={ color }
        width={ TILE_WIDTH * 9 / 10 }
        style={ assign({}, getTilePosition(town.tile), { padding: TILE_WIDTH * 1 / 20 }) }>
        <polygon
            points='300,150 225,280 75,280 0,150 75,20 225,20'
            stroke={ 'blue' }
            strokeWidth={ 20 }
            ></polygon>
        <text fontSize={ 40 } alignmentBaseline='middle' x='50%' y='50%' textAnchor='middle' fill={ 'black' }>{ town.name}</text>;
    </svg >
);