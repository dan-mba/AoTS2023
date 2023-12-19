//Solution
type ToyListConst = ['🛹', '🚲', '🛴', '🏄'];

type Rotate<List extends Array<string>> = List extends [infer First, ...infer Rest] ? [...Rest, First] : never;

type BoxToys<Toy extends string, Count, R extends Array<string> = []> = Count extends R["length"] ? R : BoxToys<Toy, Count, [...R, Toy]>;

type Flatten<Arr extends Array<any>, flat extends Array<string> = []> = Arr extends [infer First, ...infer Rest] ?
	First extends Array<string> ? Flatten<Rest, [...flat, ...First]> : never : flat;

type Rebuild<Toys extends Array<any>, ToyList extends Array<any> = ToyListConst, Sack extends Array<any>=[]> = Toys extends [infer First, ...infer Rest]?
	Rebuild<Rest, Rotate<ToyList>, [...Sack, BoxToys<ToyList[0], First> ]> : Flatten<Sack>;

//Problem
import { Expect, Equal } from 'type-testing';

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected =  [
  '🛹', '🛹',
	'🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = [
	'🛹', '🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴',
	'🏄',
	'🛹', '🛹',
	'🚲',
	'🛴', '🛴'
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
	'🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;
