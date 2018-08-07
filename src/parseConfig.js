import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
};

export default (file) => {
  const extension = path.extname(file);
  const parser = parsers[extension];
  return parser(fs.readFileSync(file, 'utf-8'));
};