#!/usr/bin/env node
'use strict';
const meow = require('meow');
const prompt = require('prompt');
const chalk = require('chalk');
const ccnews = require('.');
const exec = require('child_process').exec;
const platform = require('os').platform();
const moment = require('moment');

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

    Example:
      $ ccnews eth
`);

ccnews(cli.input[0])
	.then(articles => {
		articles.forEach((article, index) => {
			const now = moment(new Date());
			const end = moment(article.pubDate);
			const duration = moment.duration(now.diff(end));
			const hours = duration.asHours();
			const days = duration.asDays();
			let since;
			const chalkIt = chalk.blue;
			if (hours > 24) {
				const unit = days < 2 ? 'day' : 'days';
				since = `${Math.floor(days)} ${unit} ago...`;
			} else {
				const unit = hours < 2 ? 'hour' : 'hours';
				since = `${Math.floor(hours)} ${unit} ago...`;
			}

			const selector = chalk.bgBlue(`[ ${index + 1} ]`);
			console.log((`${selector}  ${article.title}`));
			console.log(chalkIt(`\t${article.publisher} - ${since}`));
		});

		prompt.get({
			name: 'articleIndex',
			description: 'Enter the associated number to open article',
			pattern: /[0-9]/g, // Create pattern for less than article length
			before: (value) => value - 1
		}, (err, {articleIndex}) => {
			exec(`${shellOpenCommand}${articles[articleIndex].shortLink}`, function(error) {
				if (error) {
					throw new error;
				}
			});
		});
	})
	.catch(console.log)
