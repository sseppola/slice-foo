const test = require('ava')
const lib = require('./index.js')
const { slice, sliceWith, sliceWithGenerator } = require('./lib/slice-foo')


// =============================================================================
//   exports
// =============================================================================

test('slice-foo – module exports', t => {
  t.true(typeof lib.slice === 'function')
  t.true(typeof lib.sliceWith === 'function')
  t.true(typeof lib.sliceWithGenerator === 'function')
})


// =============================================================================
//   slice
// =============================================================================

test('slice – chunks add up', t => {
  const input = '12345678'
  const expected = ['1234', '5678']
  const chunks = [4, 4]

  t.deepEqual(slice(chunks, input), expected)
});

test('slice – chunks add up', t => {
  const input = '12345678'.split('')
  const expected = ['1234'.split(''), '5678'.split('')]
  const chunks = [4, 4]

  t.deepEqual(slice(chunks, input), expected)
});


test('slice – can be curried', t => {
  const input = '12345678'
  const expected = ['1234', '5678']
  const chunks = [4, 4]

  t.deepEqual(slice(chunks)(input), expected)
});


test('slice – input is not long enough', t => {
  const input = '123456'
  const expected = ['1234', '56']
  const chunks = [4, 4]

  t.deepEqual(slice(chunks, input), expected)
});


test('slice – input only enough for one chunk', t => {
  const input = '1234'
  const expected = ['1234']
  const chunks = [4, 4]

  t.deepEqual(slice(chunks, input), expected)
});


test('slice – handles empty string', t => {
  const input = ''
  const expected = []
  const chunks = [4, 4]

  t.deepEqual(slice(chunks, input), expected)
});


// =============================================================================
//   sliceWith
// =============================================================================

test('sliceWith – string devides equally into chunks', t => {
  const input = '12345678'
  const expected = ['1234', '5678']
  let n = 0
  const chunkFn = () => n < 2 ? 4 : null

  t.deepEqual(sliceWith(chunkFn, input), expected)
});


test('sliceWith – can be curried', t => {
  const input = '12345678'
  const expected = ['1234', '5678']
  let n = 0
  const chunkFn = () => n < 2 ? 4 : null

  t.deepEqual(sliceWith(chunkFn)(input), expected)
});


test('sliceWith – input is not long enough', t => {
  const input = '123456'
  const expected = ['1234', '56']
  let n = 0
  const chunkFn = () => n < 2 ? 4 : null

  t.deepEqual(sliceWith(chunkFn, input), expected)
});


test('sliceWith – input only enough for one chunk', t => {
  const input = '1234'
  const expected = ['1234']
  let n = 0
  const chunkFn = () => n < 2 ? 4 : null

  t.deepEqual(sliceWith(chunkFn, input), expected)
});


test('sliceWith – handles empty string', t => {
  const input = ''
  const expected = []
  let n = 0
  const chunkFn = () => n < 2 ? 4 : null

  t.deepEqual(sliceWith(chunkFn, input), expected)
});


// =============================================================================
//   sliceWithGenerator
// =============================================================================

function* chunkGenerator () {
  let n = 0
  while (n < 2) {
    yield 4
    n++
  }
}


test('sliceWithGenerator – string devides equally into chunks', t => {
  const input = '12345678'
  const expected = ['1234', '5678']

  t.deepEqual(sliceWithGenerator(chunkGenerator, input), expected)
});


test('sliceWithGenerator – can be curried', t => {
  const input = '12345678'
  const expected = ['1234', '5678']

  t.deepEqual(sliceWithGenerator(chunkGenerator, input), expected)
});


test('sliceWithGenerator – input is not long enough', t => {
  const input = '123456'
  const expected = ['1234', '56']

  t.deepEqual(sliceWithGenerator(chunkGenerator, input), expected)
});


test('sliceWithGenerator – input only enough for one chunk', t => {
  const input = '1234'
  const expected = ['1234']

  t.deepEqual(sliceWithGenerator(chunkGenerator, input), expected)
});


test('sliceWithGenerator – handles empty string', t => {
  const input = ''
  const expected = []

  t.deepEqual(sliceWithGenerator(chunkGenerator, input), expected)
});
