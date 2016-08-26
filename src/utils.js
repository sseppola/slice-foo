const curry = require('lodash.curry')


/*
 * Takes an array and creates a generator that returns a new element for each
 * iteration. When there are no more elements the generator finishes.
*/
function* singlesGenerator(ns) {
  let i = 0
  while (i < ns.length)
    yield ns[i]
}


/*
 * Takes an array and returns 1 element at a time each time the function is
 * called. When there are no more elements the function returns undefined.
*/
const singles = ns => {
  let i = 0;
  return () => ns[i++]
}


module.exports = { curry, singlesGenerator, singles }
