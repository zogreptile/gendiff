#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import gendiff from '..';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((file1, file2) => console.log(gendiff(file1, file2)))
  .parse(process.argv);
