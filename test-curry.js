const curry = require('./curry');
const {
	randomPartition,
	random,
	randomTestFunction
} = require('./random-utilities');

/* Random Tests Cases */
;(() => {
	const debug = false;					// <-- Change to true to see output
	const numberOfRuns = 100;			// <-- Set the number of trials

	for (let i = 0; i < numberOfRuns; i++) {
		const argLength = random(1, 10);
		Object.defineProperty(randomTestFunction, 'length', {value: argLength});
		const args = Array.from({length: argLength}).map(() => random(1, 10));
		const resultString = randomTestFunction(...args);
		const result = eval(resultString);
		const curriedRandomTest = curry(randomTestFunction);
		const partArgs = randomPartition(args);
		const curryResultString = partArgs.reduce((fn, args) => fn(...args), curriedRandomTest);
		const curryResult = eval(curryResultString);

		if (debug) {
			console.debug('RUN:     ', i + 1);
			console.debug('length:  ', randomTestFunction.length);
			console.debug('result:  ', `${resultString} = ${result}`);
			console.debug('currie:  ', `${curryResultString} = ${curryResult}`);
			console.debug('partArgs:', partArgs);
			console.debug('-'.repeat(64));
		}

		if (resultString !== curryResultString) {
			throw new Error(
				JSON.stringify({
					RUN: i + 1,
					message: 'random curried result differs from non-curried result',
					argLength: randomTestFunction.length,
					result: `${resultString} = ${result}`,
					currie: `${curryResultString} = ${curryResult}`,
				}, null, 4)
			);
		}
	}
})();

/* Concrete Test Cases */
;(() => {
	function fancyEquation(a, b, c, d, e) {
		return (c * d - a * b) / e;
	}
	const result1 = fancyEquation(1, 2, 3, 4, 5);  // 2
	const result2 = fancyEquation(3, 4, 5, 6, 3);  // 6

	const curriedFancyEquation = curry(fancyEquation);
	const currie11 = curriedFancyEquation(1)(2)(3)(4)(5); 		// 2
	const currie12 = curriedFancyEquation(1, 2)(3, 4, 5); 		// 2
	const currie13 = curriedFancyEquation(1, 2, 3, 4, 5); 		// 2
	const currie14 = curriedFancyEquation(1, 2, 3, 4)(5, 6);	// 2
	const currie21 = curriedFancyEquation(3)(4)(5)(6)(3); 		// 6

	if (
		   currie11 !== result1
		|| currie12 !== result1
		|| currie13 !== result1
		|| currie14 !== result1
		|| currie21 !== result2
	) throw new Error(
		JSON.stringify({
			message: 'simple curried result differs from non-curried result',
			result1,
			curry1: [currie11, currie12, currie13, currie14],
			result2,
			curry2: [currie21],
		}, null, 4)
	);

	function addThreeNumbers(first, second, third) {
		return first + second + third;
	}
	const curriedAddThreeNumbers = curry(addThreeNumbers);
	const addOne = curriedAddThreeNumbers(1);
	const addSix = addOne(5);
	const addSeven = addOne(6);
	addSix(10);		// 16
	addSix(20);		// 26
	addSeven(3);	// 10

	if (
		   addSix(10) !== 16
		|| addSix(20) !== 26
		|| addSeven(3) !== 10
	) throw new Error(
		JSON.stringify({
			message: 'curried result differs from expected result',
			expected: 16,
			received: addSix(10),
			expected: 26,
			received: addSix(20),
			expected: 10,
			received: addSeven(3),
		}, null, 4)
	);
})();

console.log('All Tests Passed');





