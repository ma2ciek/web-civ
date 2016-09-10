import * as React from 'react';

interface HexImageTileProps {
    url: string;
}

export const HexImageTile = ({ url }: HexImageTileProps) => {
    return (
        <g>
            <defs>
                <pattern id={url} patternUnits='userSpaceOnUse' width='300' height='300'>
                    <image xlinkHref={'images/' + url} x='0' y='0' width='300' height='300' />
                </pattern>
            </defs>

            <polygon points='300,150 225,280 75,280 0,150 75,20 225,20'
                fill={'url(' + url + ')'}>
            </polygon>
        </g>
    );
}