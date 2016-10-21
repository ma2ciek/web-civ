import { Player, AppState, Selection } from '../AppState';
import { merge, getSelected, getSurroundingTileIds, getTileCameraPosition } from '../utils';
import { uniq } from 'lodash';
import { generatePlayers } from '../generators';

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
    console.log(state);
    const players = generatePlayers({ allTiles: state.tiles })
        .map(p => updatePlayerSeenTiles(p));

    const selectedUnit = players[0].units[0];
    const firstUnitTileCameraPosition = getTileCameraPosition(selectedUnit.tileId, state.camera.zoom);

    return merge(state, {
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