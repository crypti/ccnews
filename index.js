'use strict';
const assert = require('assert');
const GoogleNewsRss = require('google-news-rss');
const cc = require('cryptocurrencies');
const googleNews = new GoogleNewsRss();

module.exports = (symbol) => {
	const currency = cc[symbol.toUpperCase()];

	if (!currency) {
		throw new Error(`No matching symbol found for ${symbol}`);
	}
	// Formats the response to make it look pretty in Cli
	return googleNews.search(currency);
};
