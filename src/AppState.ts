export interface AppState {
    tiles: Tile[];
    players: Player[];
    turn: number;
    currentPlayerIndex: number;
    camera: Camera;
    selection: Selection | null;
    hoveredTileIndex: number;
}

export interface Selection {
    type: 'unit' | 'town';
    id: string;
}

export interface Tile {
    id: number;
    ownerId: number;
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

interface BaseUnit {
    tileId: number;
    id: string;
    ownerId: number;
    movement: number;
    movementLeft: number;
    hp: number;
    hpLeft: number;
    meleeDamage?: number;
    experience?: number;
}

export interface Settler extends BaseUnit {
    name: 'settler';
}

export interface Warrior extends BaseUnit {
    name: 'warrior';
    meleeDamage: number;
    experience: number;
}

export type Unit = Settler | Warrior;

export interface Camera extends Position {
    zoom: number;
}

export interface Position {
    left: number;
    top: number;
}

export interface Town {
    ownerId: number;
    id: string;
    tileId: number;
    buildings: Building[];
    name: string;
}

export interface Building {
    name: string;
}

export interface ZoomEvent {
    x: number;
    y: number;
    delta: number;
}