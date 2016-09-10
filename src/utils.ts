export function getRandomType(chanceList: { type: string, chance: number }[]) {
    const multiplier = 1 / chanceList.map(t => t.chance).reduce((sum, x) => sum + x, 0);

    let random = Math.random();

    for (const t of chanceList) {
        if (random < t.chance * multiplier)
            return t.type;

        random -= t.chance * multiplier;
    }
}