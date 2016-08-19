# slice-foo

> Slices foo<Sliceable> any way you'd like


## Install

```
$ npm install --save slice-foo
```
Written in **ES6** and uses generators so you'll need **Node 6** or a **transpiler** to use it.

## Usage

```js
const sliceFoo = require('slice-foo')

sliceFoo.slice([4, 4, 4, 4], '4040414142424343')
//=> ['4040', '4141', '4242', '4343']


// It's curried so you can do compose functions like
const parseCardNumber = sliceFoo.slice([4, 4, 4, 4])

parseCardNumber('4040414142424343')
//=> ['4040', '4141', '4242', '4343']

parseCardNumber('4040414142')
//=> ['4040', '4141', '42']

parseCardNumber('40404141')
//=> ['4040', '4141']

// easily join into the format you'd like
parseCardNumber('4040414142424343').join(' ')
//=> '4040 4141 4242 4343'
```
+ sliceWith functions to specify chunk sizes dynamically, see API.

Read the [tests](tests.js) to see how it behaves.


## API

#### Note:
> Sliceable: A type that implements .slice (eg. Array and String)

### .slice
`slice :: [Number] -> Sliceable -> [a]`

Slices a sliceable into chunks specified by an array of numbers

```js
const sliceFoo = require('slice-foo')

sliceFoo.slice([4, 4, 4, 4], '4040414142424343')
//=> ['4040', '4141', '4242', '4343']
```


### .sliceWith
`sliceWith :: (() -> Number) -> Sliceable -> [a]`

Slices a sliceable into chunks using a function

```js
const sliceFoo = require('slice-foo')

let i = 0
const getChuckSize = () => {
  if (i++ % 2 === 0)
    return 4
  else
    return 2
}

sliceFoo.sliceWith(getChuckSize, '4040414142424343')
//=> ['4040', '41', '4142', '42', '4343']
```


### .sliceWithGenerator
`sliceWithGenerator :: (function* -> Number) -> Sliceable -> [a]`

Slices a sliceable into chunks using a generator

```js
const sliceFoo = require('slice-foo')

function* chunkGenerator () {
  let n = 0
  while (n++ < 2)
    yield 4
}

sliceFoo.sliceWithGenerator(chunkGenerator, '4040414142424343')
//=> ['4040', '4141']
```

## Why?
I needed a module to format strings and found most modules do too many things. It's built to be useful on it's own and composed into more specific functions. Aaand I wanted to publish my first open source project ☝️

## License

MIT © [Sindre Seppola](https://github.com/sseppola)
