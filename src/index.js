import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { has } from 'lodash';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
};

const parseFile = (file) => {
  const extension = path.extname(file);
  const parser = parsers[extension];
  return parser(fs.readFileSync(file, 'utf-8'));
};

const compare = (file1, file2) => {
  const f1 = parseFile(file1);
  const f2 = parseFile(file2);

  const deletedItems = Object.keys(f1).reduce((acc, key) =>
    (!has(f2, key) ? [...acc, `  - ${key}: ${f1[key]}`] : [...acc]), []);

  const remainedChangedNewItems = Object.keys(f2).reduce((acc, key) => {
    if (has(f1, key)) {
      return f1[key] === f2[key] ?
        [...acc, `    ${key}: ${f1[key]}`] :
        [...acc, `  - ${key}: ${f1[key]}`, `  + ${key}: ${f2[key]}`];
    }

    return [...acc, `  + ${key}: ${f2[key]}`];
  }, []);

  return remainedChangedNewItems.concat(deletedItems);
};

const print = coll => `{\n${coll.map(el => `${el}\n`).join('')}}`;

export default (file1, file2) => print(compare(file1, file2));
