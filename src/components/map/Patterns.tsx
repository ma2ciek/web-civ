import * as React from 'react';
import { TILE_WIDTH } from '../../constants';

interface PatternProps {
    name: string;
    image: string;
    imageScale?: number;
}

export const Pattern = ({ name, image, imageScale = 1}: PatternProps) => (
    <pattern id={name} patternUnits='userSpaceOnUse' width={TILE_WIDTH} height={TILE_WIDTH}>
        <image xlinkHref={'images/' + image}
            x={TILE_WIDTH * ((1 - imageScale) / 2) }
            y={TILE_WIDTH * ((1 - imageScale) / 2) }
            width={TILE_WIDTH * imageScale}
            height={TILE_WIDTH * imageScale} />
    </pattern>
);

export const Patterns = () => (
    <defs>
        <Pattern name='water' image='water-texture.jpg' />
        <Pattern name='grass' image='grass-texture.jpg' />
        <Pattern name='forest' image='forest-texture.jpg' />
        <Pattern name='middle-age-city' image='middle-age-city.jpg' />
        <Pattern name='warrior' image='warrior.png' imageScale={0.8} />
        <Pattern name='settler' image='settler.png' imageScale={0.8} />
    </defs>
);
