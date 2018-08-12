import _ from 'lodash';

const typeActions = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: (oldValue, newValue, fn) => ({ children: fn(oldValue, newValue) }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: oldValue => ({ value: oldValue }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => _.has(obj1, key) === false,
    process: (oldValue, newValue) => ({ value: newValue }),
  },
  {
    type: 'removed',
    check: (obj1, obj2, key) => _.has(obj2, key) === false,
    process: oldValue => ({ value: oldValue }),
  },
];

const constructAST = (obj1 = {}, obj2 = {}) => {
  const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  return commonKeys.map((key) => {
    const { type, process } = _.find(typeActions, ({ check }) => check(obj1, obj2, key));

    return {
      type, name: key, ...process(obj1[key], obj2[key], constructAST),
    };
  });
};

export default constructAST;
