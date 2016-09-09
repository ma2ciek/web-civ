export interface AppState {
    tiles: Tile[];
    players: Player[];
    turn: number;
    currentPlayerIndex: number;
    mapWidth: number;
    mapHeight: number;
    playersAmount: number;
    camera: Camera;
    selectedUnitIndex: number;
}

export interface Tile {
    id: number;
    owner: Player;
    position: Position;
    type: string;
}

export interface Player {
    id: number;
    isHuman: boolean;
    seenTiles: Tile[];
    nation: string;
    units: Unit[];
}

export interface Unit {
    tile: Tile;
    name: string;
}

export interface Camera extends Position {
    zoom: number;
}

interface Position {
    x: number;
    y: number;
}