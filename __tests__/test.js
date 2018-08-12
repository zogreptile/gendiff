import fs from 'fs';
import gendiff from '../src';

test('Flat JSON configs', () => {
  const filePathBefore = './__tests__/__fixtures__/json/before.json';
  const filePathAfter = './__tests__/__fixtures__/json/after.json';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/flat-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Flat YAML configs', () => {
  const filePathBefore = './__tests__/__fixtures__/yaml/before.yml';
  const filePathAfter = './__tests__/__fixtures__/yaml/after.yml';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/flat-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Flat INI configs', () => {
  const filePathBefore = './__tests__/__fixtures__/ini/before.ini';
  const filePathAfter = './__tests__/__fixtures__/ini/after.ini';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/flat-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Pretty output - nested JSON configs', () => {
  const filePathBefore = './__tests__/__fixtures__/json/nested-before.json';
  const filePathAfter = './__tests__/__fixtures__/json/nested-after.json';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/pretty-nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Pretty output - nested YAML configs', () => {
  const filePathBefore = './__tests__/__fixtures__/yaml/nested-before.yaml';
  const filePathAfter = './__tests__/__fixtures__/yaml/nested-after.yaml';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/pretty-nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Pretty output - nested INI configs', () => {
  const filePathBefore = './__tests__/__fixtures__/ini/nested-before.ini';
  const filePathAfter = './__tests__/__fixtures__/ini/nested-after.ini';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/pretty-nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter)).toEqual(fileExpected);
});

test('Plain output - nested JSON configs', () => {
  const filePathBefore = './__tests__/__fixtures__/json/nested-before.json';
  const filePathAfter = './__tests__/__fixtures__/json/nested-after.json';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/plain-nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter, 'plain')).toEqual(fileExpected);
});

test('Plain output - nested YAML configs', () => {
  const filePathBefore = './__tests__/__fixtures__/yaml/nested-before.yaml';
  const filePathAfter = './__tests__/__fixtures__/yaml/nested-after.yaml';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/plain-nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter, 'plain')).toEqual(fileExpected);
});

test('Plain output - nested INI configs', () => {
  const filePathBefore = './__tests__/__fixtures__/ini/nested-before.ini';
  const filePathAfter = './__tests__/__fixtures__/ini/nested-after.ini';
  const fileExpected = fs.readFileSync('./__tests__/__fixtures__/plain-nested-expected.txt', 'utf-8');

  expect(gendiff(filePathBefore, filePathAfter, 'plain')).toEqual(fileExpected);
});
