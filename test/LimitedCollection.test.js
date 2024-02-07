/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable id-length */
import { expect, test } from 'vitest';
import { LimitedCollection } from 'discord.js';


test('[LimitedCollection] Test keep over limit with given max size', () => {

	let test = new LimitedCollection({
		maxSize: 2, keepOverLimit: value => value === 2,
	});
	test.set(1,1 );

	expect(test.size).toEqual(1);
	expect(test.has(1)).toBeTruthy();

	test.set(2,2 );

	expect(test.size).toEqual(2);
	expect(test.has(1)).toBeTruthy();
	expect(test.has(2)).toBeTruthy();

	test.set(3,3 );

	expect(test.size).toEqual(2);
	expect(test.has(1)).toBeTruthy();
	expect(test.has(2)).toBeTruthy();
	expect(test.has(3)).toBeFalsy();

	test.set(4,2 );

	expect(test.size).toEqual(3);
	expect(test.has(1)).toBeTruthy();
	expect(test.has(2)).toBeTruthy();
	expect(test.has(4)).toBeTruthy();
});

test('[LimitedCollection] Test keep over limit with zero max size', () => {

	let test = new LimitedCollection({
		maxSize: 0, keepOverLimit: value => value === 2,
	});
	test.set(1,1 );

	expect(test.size).toEqual(0);

	test.set(2,2 );

	expect(test.size).toEqual(1);
	expect(test.has(2)).toBeTruthy();
});

test('[LimitedCollection] Test keep over limit without max size', () => {

	let test = new LimitedCollection({
		 keepOverLimit: value => value === 2,
	});

	expect(test.maxSize).toEqual(Infinity);
	test.set(1,1 );

	expect(test.size).toEqual(1);
	expect(test.has(1)).toBeTruthy();

	test.set(2,2 );

	expect(test.size).toEqual(2);
	expect(test.has(2)).toBeTruthy();
});

test('[LimitedCollection] Test keep over limit without keepOverLimit', () => {

	let test = new LimitedCollection({
		 maxSize: 2,
	});

	test.set(1,1 );

	expect(test.size).toEqual(1);
	expect(test.has(1)).toBeTruthy();

	test.set(2,2 );

	expect(test.size).toEqual(2);
	expect(test.has(2)).toBeTruthy();

	test.set(3,3 );

	expect(test.size).toEqual(2);
	expect(test.has(3)).toBeFalsy();
});

test('[LimitedCollection] Test keep over limit with given max size but same key', () => {

	let test = new LimitedCollection({
		maxSize: 2, keepOverLimit: value => value === 2,
	});
	test.set(1,1 );

	expect(test.size).toEqual(1);
	expect(test.has(1)).toBeTruthy();

	test.set(2,2 );

	expect(test.size).toEqual(2);
	expect(test.has(1)).toBeTruthy();
	expect(test.has(2)).toBeTruthy();

	test.set(3,3 );

	expect(test.size).toEqual(2);
	expect(test.has(1)).toBeTruthy();
	expect(test.has(2)).toBeTruthy();
	expect(test.has(3)).toBeFalsy();

	test.set(2,7 );

	expect(test.size).toEqual(2);
	expect(test.get(2)).toEqual(7);
	expect(test.has(2)).toBeTruthy();
});

test('[LimitedCollection] Test replace map entry when maxSize is null', () => {

	let test = new LimitedCollection({
		maxSize: 0, keepOverLimit: value => value === 2,
	});
	test.set(2,2 );

	expect(test.size).toEqual(1);
	expect(test.has(2)).toBeTruthy();

	test.set(2,8 );

	expect(test.size).toEqual(1);
	expect(test.get(2)).toEqual(8);
});

test('[LimitedCollection] Test with two collections', () => {

	let test = new LimitedCollection({
		maxSize: 0, keepOverLimit: value => value === 2 || value === 4,
	});

	test.set(2,2 );

	expect(test.size).toEqual(1);
	expect(test.has(2)).toBeTruthy();

	test.set(2,4 );

	expect(test.size).toEqual(1);
	expect(test.get(2)).toEqual(4);

});

test('[LimitedCollection] Test with two collections', () => {

	let test = new LimitedCollection({
		maxSize: 2, keepOverLimit: value => value === 2 || value === 4,
	});

	test.set(2,2 );

	expect(test.size).toEqual(1);
	expect(test.has(2)).toBeTruthy();

	test.set(2,8 );

	expect(test.size).toEqual(1);
	expect(test.get(2)).toEqual(8);

});