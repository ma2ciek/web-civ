import { createCssTransformMatrix } from '../../utils';
import * as React from 'react';

interface TransformProps {
    left: number;
    top: number;
    zoom: number;
    children?: React.ReactChildren;
}

export const Transform = ({ left, top, zoom = 1, children }: TransformProps) => (
    <g transform={createCssTransformMatrix({ left, top }, zoom)}>
        {children}
    </g>
);
