import fs from 'fs';
import { has } from 'lodash';

const compare = (file1, file2) => {
  const f1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const f2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));

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
