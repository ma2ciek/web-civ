export interface AppState {
    tiles: Tile[];
    players: Player[];
    turn: number;
    currentPlayerIndex: number;
    camera: Camera;
    selection: Selection;
}

export interface Selection {
    type: 'unit' | 'town' | 'none';
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
    seenTileIds: number[];
    nation: string;
    units: Unit[];
    towns: Town[];
}

export interface Unit {
    tileId: number;
    name: string;
    id: number;
    ownerId: number;
    movement: number;
    movementLeft: number;
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