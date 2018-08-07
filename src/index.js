import { has, union } from 'lodash';
import parseConfig from './parseConfig';

const compare = (file1, file2) => {
  const f1 = parseConfig(file1);
  const f2 = parseConfig(file2);

  return union(Object.keys(f1), Object.keys(f2)).reduce((acc, key) => {
    if (has(f1, key) && has(f2, key)) {
      return f1[key] === f2[key] ?
        [...acc, `    ${key}: ${f1[key]}`] :
        [...acc, `  - ${key}: ${f1[key]}`, `  + ${key}: ${f2[key]}`];
    }

    if (has(f1, key) && !has(f2, key)) {
      return [...acc, `  - ${key}: ${f1[key]}`];
    }

    return [...acc, `  + ${key}: ${f2[key]}`];
  }, []);
};

const print = coll => `{\n${coll.map(el => `${el}\n`).join('')}}`;

export default (file1, file2) => print(compare(file1, file2));
