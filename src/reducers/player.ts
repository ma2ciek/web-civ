import { AppState, Player, Selection } from '../AppState';
import { getSelected, getSurroundingTileIds, getTileCameraPosition, merge } from '../utils';

import { generatePlayers } from '../generators';
import { uniq } from 'lodash';

export function updatePlayerSeenTiles(player: Player) {
    return merge(player, {
        seenTileIds: uniq([
            ...player.seenTileIds,
            ...getSurroundingTileIds(getSurroundingTileIds([
                ...player.units.map(u => u.tileId),
                ...player.towns.map(t => t.tileId),
            ])),
        ]),
    });
}


export function createPlayersHandler(state: AppState) {
    let { players, nextSeed } = generatePlayers({ allTiles: state.tiles, seed: state.seed });
    players = players.map(p => updatePlayerSeenTiles(p));

    const selectedUnit = players[0].units[0];
    const firstUnitTileCameraPosition = getTileCameraPosition(selectedUnit.tileId, state.camera.zoom);

    return merge(state, {
        seed: nextSeed,
        selection: {
            type: 'unit',
            id: selectedUnit.id,
        } as Selection | null,
        players,
        camera: merge(state.camera, firstUnitTileCameraPosition),
    });
}

export function nextTurnHandler(state: AppState) {
    const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
    const nextPlayer = state.players[nextPlayerIndex];

    const { selection, tilePosition } = getSelected(nextPlayer, state.camera.zoom);

    return merge(state, {
        hoveredTileIndex: -1,
        selection: selection as Selection | null,
        currentPlayerIndex: nextPlayerIndex,
        turn: state.turn + (nextPlayerIndex === 0 ? 1 : 0),
        camera: tilePosition ? merge(state.camera, tilePosition) : state.camera,

        players: state.players.map(p => merge(p, {
            units: p.units.map(unit => merge(unit, {
                movementLeft: unit.movement,
            })),
        })),
    });
}