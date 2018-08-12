import _ from 'lodash';

const indent = depth => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const keys = Object.keys(value);
  const result = keys
    .map(key => `    ${key}: ${stringify(value[key], depth + 1)}`)
    .join('\n');

  return `{\n${indent(depth + 1)}${result}\n${indent(depth + 1)}}`;
};

const render = (ast, depth = 0) => {
  const typeFormats = {
    nested: node => `${indent(depth + 1)}${node.name}: ${render(node.children, depth + 1)}`,
    unchanged: node => `${indent(depth + 1)}${node.name}: ${stringify(node.value, depth)}`,
    changed: node => [
      `${indent(depth)}  - ${node.name}: ${stringify(node.oldValue, depth)}`,
      `${indent(depth)}  + ${node.name}: ${stringify(node.newValue, depth)}`,
    ],
    added: node => `${indent(depth)}  + ${node.name}: ${stringify(node.value, depth)}`,
    removed: node => `${indent(depth)}  - ${node.name}: ${stringify(node.value, depth)}`,
  };

  const result = _.flatten(ast.map(node => typeFormats[node.type](node))).join('\n');

  return `{\n${result}\n${indent(depth)}}`;
};

export default render;
