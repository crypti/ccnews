# eth-news [![Build Status](https://travis-ci.org/brh55/eth-news.svg?branch=master)](https://travis-ci.org/brh55/eth-news) [![Coverage Status](https://coveralls.io/repos/github/brh55/eth-news/badge.svg?branch=master)](https://coveralls.io/github/brh55/eth-news?branch=master)

> My brilliant module


## Install

```
$ npm install --save eth-news
```


## Usage

```js
const ethNews = require('eth-news');

ethNews('unicorns');
//=> 'unicorns & rainbows'
```


## API

### ethNews(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global eth-news
```

```
$ eth-news --help

  Usage
    eth-news [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ eth-news
    unicorns & rainbows
    $ eth-news ponies
    ponies & rainbows
```


## License

MIT © [brh55](https://github.com/brh55/cli-eth-price)
