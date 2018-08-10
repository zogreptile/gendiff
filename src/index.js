import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './config-parser';

const getObjectsKeys = (obj1, obj2) =>
  _.union(Object.keys(obj1), Object.keys(obj2));

const nodeTypes = {
  unchanged: (type, ...args) => {
    const [name, value = '', children = []] = args;
    return ({
      type,
      name,
      value,
      children,
    });
  },
  changed: (type, ...args) => {
    const [name, oldValue = '', newValue = '', children = []] = args;
    return ({
      type,
      name,
      oldValue,
      newValue,
      children,
    });
  },
  added: (type, ...args) => {
    const [name, value = '', children = []] = args;
    return ({
      type,
      name,
      value,
      children,
    });
  },
  removed: (type, ...args) => {
    const [name, value = '', children = []] = args;
    return ({
      type,
      name,
      value,
      children,
    });
  },
};

const buildNode = (type, ...args) => nodeTypes[type](type, ...args);

const iter = (obj1 = {}, obj2 = {}) => {
  const filesKeys = getObjectsKeys(obj1, obj2);

  return filesKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      const children = iter(value1, value2);
      return [...acc, buildNode('unchanged', key, '', children)];
    }

    if (value1 === value2) {
      return [...acc, buildNode('unchanged', key, value1)];
    }

    if (_.has(obj1, key) && _.has(obj2, key)) {
      const oldValue = _.isObject(value1) ? '' : value1;
      const newValue = _.isObject(value2) ? '' : value2;
      let children = [];

      if (_.isObject(value1)) {
        children = iter(value1);
      } else if (_.isObject(value2)) {
        children = iter(value2);
      }

      return [...acc, buildNode('changed', key, oldValue, newValue, children)];
    }

    if (!_.has(obj2, key)) {
      const value = _.isObject(value1) ? '' : value1;
      const children = _.isObject(value1) ? iter(value1) : [];

      return [...acc, buildNode('removed', key, value, children)];
    }

    const value = _.isObject(value2) ? '' : value2;
    const children = _.isObject(value2) ? iter(value2) : [];

    return [...acc, buildNode(
      'added',
      key,
      value,
      children,
    )];
  }, []);
};

const compare = (filePath1, filePath2) => {
  const fileExtension = path.extname(filePath1);
  const parseConfig = getParser(fileExtension);
  const parsedFile1 = parseConfig(fs.readFileSync(filePath1, 'utf-8'));
  const parsedFile2 = parseConfig(fs.readFileSync(filePath2, 'utf-8'));

  return iter(parsedFile1, parsedFile2);
};

// const print = coll => `{\n${coll.map(el => `${el}\n`).join('')}}`;

export default (filePath1, filePath2) => JSON.stringify(compare(filePath1, filePath2));
