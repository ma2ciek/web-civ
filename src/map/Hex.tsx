import * as React from 'react';

interface HexProps {
    pattern: string;
    scale: number;
}

export function Hex({ pattern, scale }: HexProps) {
    return (
        <polygon
            points='300,150 225,280 75,280 0,150 75,20 225,20'
            transform={'scale(' + scale + ')'}
            fill={'url(#' + pattern + ')'}>
        </polygon>
    );
}
