import { Town } from '../AppState';
import { v4 } from 'node-uuid';

export function generateTown(tileId: number, playerId: number): Town {
    return {
        tileId: tileId,
        ownerId: playerId,
        id: v4(),
        name: 'Unnamed town',
        buildings: [],
    };
}

