import * as mocha from 'mocha';

import { getRandom, getRandoms, getUnique, getUniques } from './random';

import { expect } from 'chai';

describe('getRandom()', () => {
	it('should return random value and next seed', () => {
		const random = getRandom(1);

		expect(random.value).to.equal(0.7098480789645691);
		expect(random.nextSeed).to.equal(2);
	});
});

describe('getRandoms()', () => {
	it('should return array of random values and next seed', () => {
		const random = getRandoms(2, 1);

		expect(random.values).to.deep.equal([
			0.7098480789645691,
			0.9742682568175951,
		]);
		expect(random.nextSeed).to.equal(3);
	});
});

describe('getUnique()', () => {
	it('should return unique value and next seed', () => {
		const random = getUnique(1);
		const expected = '098480-742682-000805';

		expect(random.value).to.equal(expected);
		expect(random.nextSeed).to.equal(4);
	});
});

describe('getUniques()', () => {
	it('should return array of unique values and next seed', () => {
		const random = getUniques(2, 1);

		expect(random.values).to.deep.equal([
			'098480-742682-000805',
			'750469-572533-450180',
		]);
		expect(random.nextSeed).to.equal(7);
	});
});