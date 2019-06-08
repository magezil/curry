
function curry(func, args_param=[]) {
    return function () {
        const args = args_param.concat([...arguments]);
        if (func.length <= args.length) {
            temp = func.apply(null, args);
            return temp;
        }
        return curry(func, args);
    }
}

module.exports = curry;
