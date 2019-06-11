function curry(func) {
    return function () {
        const fn_args = [...arguments]
        // Return value if enough args have been passed in.
        if (func.length <= fn_args.length) {
            temp = func.apply(null, fn_args);
            return temp;
        }
        // Return function to take in additional values otherwise.
        return curry(func.bind(null, ...fn_args))
    }
}

module.exports = curry;
