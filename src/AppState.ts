export interface AppState {
    tiles: Tile[];
    players: Player[];
    turn: number;
    currentPlayerIndex: number;
    camera: Camera;
    selected: Selected;
}

export interface Selected {
    type: string;
    id: number;
}

export interface Tile {
    id: number;
    ownerId: number;
    position: Position;
    type: string;
}

export interface Player {
    id: number;
    isHuman: boolean;
    seenTiles: Tile[];
    nation: string;
    units: Unit[];
    towns: Town[];
}

export interface Unit {
    tile: Tile;
    name: string;
    id: number;
    ownerId: number;
}

export interface Camera extends Position {
    zoom: number;
}

export interface Position {
    left: number;
    top: number;
}

export interface Town {
    ownerId: number;
    id: number;
    tile: Tile;
    buildings: Building[];
    name: string;
}

export interface Building {
    name: string;
}