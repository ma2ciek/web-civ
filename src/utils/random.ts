export function getRandom(seed: number) {
	const x = Math.sin(seed) * 10000;
	const value = x - Math.floor(x);

	return { nextSeed: seed + 1, value };
}

export function getRandoms(count: number, seed: number) {
	const values: number[] = [];

	for (let i = 0; i < count; i++) {
		const random = getRandom(seed);
		values.push(random.value);
		seed = random.nextSeed;
	}

	return { values, nextSeed: seed };
}

export interface Unique {
	value: string;
	nextSeed: number;
}

export function getUnique(seed: number) {
	const r1 = getRandom(seed);
	const r2 = getRandom(r1.nextSeed);
	const r3 = getRandom(r2.nextSeed);
	const value = r1.value.toString().slice(3, 9) + '-' +
		r2.value.toString().slice(3, 9) + '-' +
		r3.value.toString().slice(3, 9);

	return { value, nextSeed: r3.nextSeed };
}

export function getUniques(count: number, seed: number) {
	const values: string[] = [];

	for (let i = 0; i < count; i++) {
		const unique = getUnique(seed);
		values.push(unique.value);
		seed = unique.nextSeed;
	}

	return {
		values,
		nextSeed: seed,
	};
}