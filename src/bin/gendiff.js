#!/usr/bin/env node

import { version } from '../../package.json';

const program = require('commander');

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
