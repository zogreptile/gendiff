import fs from 'fs';
import gendiff from '../src';

test('Flat JSON configs', () => {
  const filePathBefore = './__tests__/__fixtures__/before.json';
  const filePathAfter = './__tests__/__fixtures__/after.json';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Flat YAML configs', () => {
  const filePathBefore = './__tests__/__fixtures__/before.yml';
  const filePathAfter = './__tests__/__fixtures__/after.yml';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Flat INI configs', () => {
  const filePathBefore = './__tests__/__fixtures__/before.ini';
  const filePathAfter = './__tests__/__fixtures__/after.ini';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Nested JSON configs', () => {
  const filePathBefore = './__tests__/__fixtures__/nested-before.json';
  const filePathAfter = './__tests__/__fixtures__/nested-after.json';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Nested YAML configs', () => {
  const filePathBefore = './__tests__/__fixtures__/nested-before.yaml';
  const filePathAfter = './__tests__/__fixtures__/nested-after.yaml';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Nested INI configs', () => {
  const filePathBefore = './__tests__/__fixtures__/nested-before.ini';
  const filePathAfter = './__tests__/__fixtures__/nested-after.ini';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});
