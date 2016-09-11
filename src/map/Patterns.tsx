import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../AppState';
import { TILE_WIDTH } from '../constants';

interface PatternProps {
    name: string;
    image: string;
    scale: number;
    imageScale?: number;
}

export const Pattern = ({ scale, name, image, imageScale = 1}: PatternProps) => (
    <pattern id={name} patternUnits='userSpaceOnUse' width={TILE_WIDTH} height={TILE_WIDTH}>
        <image xlinkHref={'images/' + image}
            x={TILE_WIDTH * ((1 - imageScale) / 2)}
            y={TILE_WIDTH * ((1 - imageScale) / 2)}
            width={TILE_WIDTH * imageScale}
            height={TILE_WIDTH * imageScale} />
    </pattern>
);

export const _Patterns = ({ scale }: { scale: number }) => (
    <defs>
        <Pattern scale={scale} name='water' image='water-texture.jpg' />
        <Pattern scale={scale} name='grass' image='grass-texture.jpg' />
        <Pattern scale={scale} name='forest' image='forest-texture.jpg' />
        <Pattern scale={scale} name='middle-age-city' image='middle-age-city.jpg' />
        <Pattern scale={scale} name='warrior' image='warrior.png' imageScale={0.8} />
        <Pattern scale={scale} name='settler' image='settler.png' imageScale={0.8} />
    </defs>
);

export const Patterns = connect(
    (state: AppState) => ({ scale: state.camera.zoom })
)(_Patterns);