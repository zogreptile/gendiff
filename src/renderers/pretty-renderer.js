import _ from 'lodash';

const indent = depth => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const result = keys.map(key =>
      `    ${key}: ${stringify(value[key], depth + 1)}`).join('\n');

    return `{
${indent(depth + 1)}${result}
${indent(depth + 1)}}`;
  }

  return value;
};

const typeFormats = [
  {
    type: 'nested',
    format: (depth, name, oldValue, newValue, children, fn) => `
${indent(depth)}    ${name}: {${indent(depth + 1)}${fn(children, depth + 1)}
${indent(depth + 1)}}`,
  },
  {
    type: 'unchanged',
    format: (depth, name, oldValue) => `
${indent(depth)}    ${name}: ${stringify(oldValue, depth)}`,
  },
  {
    type: 'changed',
    format: (depth, name, oldValue, newValue, children, fn) => `
${indent(depth)}  - ${name}: ${stringify(oldValue, depth)}
${indent(depth)}  + ${name}: ${stringify(newValue, depth, fn)}`,
  },
  {
    type: 'added',
    format: (depth, name, oldValue, newValue, children, fn) => `
${indent(depth)}  + ${name}: ${stringify(newValue, depth, fn)}`,
  },
  {
    type: 'removed',
    format: (depth, name, oldValue, newValue, children, fn) => `
${indent(depth)}  - ${name}: ${stringify(oldValue, depth, fn)}`,
  },
];

export default (ast) => {
  const iter = (tree, depth) => tree.map((node) => {
    const { format } = _.find(typeFormats, el => el.type === node.type);

    return format(
      depth,
      node.name,
      node.oldValue,
      node.newValue,
      node.children,
      iter,
    );
  }).join('');

  return `{${iter(ast, 0)}\n}`;
};
