import { version } from '../package.json';

const program = require('commander');

const core = () => program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

export default core;
