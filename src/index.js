import fs from 'fs';
import path from 'path';
import { has, union } from 'lodash';
import getParser from './config-parser';

const compare = (filePath1, filePath2) => {
  const fileExtension = path.extname(filePath1);
  const parseConfig = getParser(fileExtension);
  const parsedFile1 = parseConfig(fs.readFileSync(filePath1, 'utf-8'));
  const parsedFile2 = parseConfig(fs.readFileSync(filePath2, 'utf-8'));

  const filesKeys = union(Object.keys(parsedFile1), Object.keys(parsedFile2));

  const comparisonResult = filesKeys.reduce((acc, key) => {
    if (has(parsedFile1, key) && has(parsedFile2, key)) {
      return parsedFile1[key] === parsedFile2[key] ?
        [...acc, `    ${key}: ${parsedFile1[key]}`] :
        [...acc, `  - ${key}: ${parsedFile1[key]}`, `  + ${key}: ${parsedFile2[key]}`];
    }

    if (has(parsedFile1, key) && !has(parsedFile2, key)) {
      return [...acc, `  - ${key}: ${parsedFile1[key]}`];
    }

    return [...acc, `  + ${key}: ${parsedFile2[key]}`];
  }, []);

  return comparisonResult;
};

const print = coll => `{\n${coll.map(el => `${el}\n`).join('')}}`;

export default (filePath1, filePath2) => print(compare(filePath1, filePath2));
