const { curry, singles, singlesGenerator } = require('./utils.js')


const slicer = (i, nextFn, str) => {
  const n = nextFn()
  if (!n || str.length === i)
    return []

  if (str.length < i + n)
    return [str.slice(i, i + n)]

  return [str.slice(i, i + n)]
    .concat(slicer(i + n, nextFn, str))
}


const generatorSlicer = (i, nextGen, str) => {
  const { value: n, done } = nextGen.next()

  if (done || str.length === i)
    return []

  if (str.length < i + n)
    return [str.slice(i, i + n)]

  return [str.slice(i, i + n)]
    .concat(generatorSlicer(i + n, nextGen, str))
}


const slice = curry((ns, str) => slicer(0, singles(ns), str))
const sliceWith = curry((fn, str) => slicer(0, fn, str))
const sliceWithGenerator = curry((generator, str) => generatorSlicer(0, generator(), str))


module.exports = {
  slice,
  sliceWith,
  sliceWithGenerator,
}
