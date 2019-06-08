const randomPartition = args => {
  const arr = [...args];
  const result = [];
  let size;
  while (arr.length > 0) {
    size = random(0, 100) > 90 ? 0 : random(1, arr.length);
    result.push([...arr.splice(0, size)]);
  }
  return result;
}

const random = (min, max) => ~~(Math.max(Math.random() * max, min));

function randomTestFunction() {
  const args = [...arguments];
  const firstArg = args.shift();
  if (args.length === 0) {
    return firstArg;
  }
  return args.reduce((result, arg, index) => {
    switch(index % 4) {
      case 0:
        return `${result} + ${arg}`;
      case 1:
        return `${result} - ${arg}`;
      case 2:
        return `${result} * ${arg}`;
      case 3:
        return `${result} / ${arg}`;
    }
  }, firstArg);
}

module.exports = {
  randomPartition,
  random,
  randomTestFunction,
};