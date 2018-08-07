import fs from 'fs';
import gendiff from '../src';

const filePathBefore = './__tests__/__fixtures__/before.json';
const filePathAfter = './__tests__/__fixtures__/after.json';
const fileExpected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf-8');

test('Find differences', () => {
  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});
