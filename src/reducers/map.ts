import { AppState } from '../AppState';
import { generateTiles } from '../generators';
import { merge } from '../utils';

export function createTilesHandler (state: AppState) {
	const { tiles, seed } = generateTiles(state.seed);

	return merge(state, {
		tiles,
		seed,
	});
}