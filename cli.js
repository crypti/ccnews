#!/usr/bin/env node
'use strict';
const meow = require('meow');
const prompt = require('prompt');
const chalk = require('chalk');
const ccnews = require('.');
const exec = require('child_process').exec;
const platform = require('os').platform();

// Borrowed from https://github.com/mtharrison/hackernews
const shellOpenCommand = {
  'win32': 'start ',
  'linux': 'xdg-open ',
  'darwin': 'open '
}[platform];

prompt.message = '';

const cli = meow(`
	Usage
	  $ ccnews [symbol]
`);

ccnews(cli.input[0])
	.then(articles => {
		articles.forEach((article, index) => console.log(`[${index + 1}]  ${article.title}`));

		prompt.get({
			name: 'articleIndex',
			description: 'Enter the associated number to open article',
			pattern: /[0-9]/g, // Create pattern for less than article length
			before: (value) => value - 1
		}, (err, {articleIndex}) => {
			exec(`${shellOpenCommand}${articles[articleIndex].link}`, function(error) {
				if (error) {
					throw new error;
				}
			});
		});
	})
	.catch(console.log)
