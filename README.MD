
# Curry Function

## Overview
Your task is to implement function curry. Curry takes a function as an argument and returns a 'curried' version. That curried version is a function that receives the same number of arguments as its uncurried version. If you pass fewer arguments than it is defined to take, then it will return a function when called that will accept more arguments. This is recursive until all arguments have been recieved. Extra arguments are ignored. When all arguments have been received, the function returns the result.

### Usage Example
``` js
function fancyEquation(a, b, c, d, e) {
	return (c * d - a * b) / e;
}
fancyEquation(1, 2, 3, 4, 5);  // 2
fancyEquation(3, 4, 5, 6, 3);  // 6

const curriedFancyEquation = curry(fancyEquation);
curriedFancyEquation(1)(2)(3)(4)(5); 	// 2
curriedFancyEquation(1, 2)(3, 4, 5); 	// 2
curriedFancyEquation(1, 2, 3, 4, 5); 	// 2
curriedFancyEquation(1, 2, 3, 4)(5, 6);	// 2
curriedFancyEquation(3)(4)(5)(6)(3); 	// 6


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
```

### About curry
``` js
curry: (fn: Function) => Function
```

Note: You may use online resources to solve this problem.


## Some final things to consider...
  1. Your solution should be able to accomodate an arbitrary number of arguments to the input function.
  2. Code your solution to be generic. Don't assume that curry will only use the functions shown in the usage example above.
  3. Write clean code. We prefer that you use ES6 syntax and follow best practices.

### Development Instructions
Write all code in the curry.js file in this directory. Use CommonJS Module System to export your curry function.

### Testing
The test-curry.js file included can help you validate your solution.
