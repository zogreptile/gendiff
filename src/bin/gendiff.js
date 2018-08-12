#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import gendiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'pretty')
  .action((filePath1, filePath2) => console.log(gendiff(filePath1, filePath2, program.format)))
  .parse(process.argv);
