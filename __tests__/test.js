import fs from 'fs';
import gendiff from '../src';

test('JSON configs', () => {
  const filePathBefore = './__tests__/__fixtures__/before.json';
  const filePathAfter = './__tests__/__fixtures__/after.json';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('YAML configs', () => {
  const filePathBefore = './__tests__/__fixtures__/before.yml';
  const filePathAfter = './__tests__/__fixtures__/after.yml';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});
