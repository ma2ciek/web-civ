export const PLAYERS_COUNT = 2;

export const PLAYER_COLORS = [
    'red',
    'green',
    'yellow',
    'brown',
    'blue',
    'violet',
    'orange',
    'pink',
];

export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 20;

export const TILE_WIDTH = 300;
export const TILE_HEIGH = 300 * Math.sqrt(3) / 2;

export const tileTypes: { [type: string]: { chance: number, moveCost: number } } = {
    grass: { chance: 5, moveCost: 1 },
    forest: { chance: 2, moveCost: 1.5 },
    water: { chance: 1, moveCost: 1000 },
};