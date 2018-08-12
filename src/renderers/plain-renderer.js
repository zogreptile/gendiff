import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } else if (typeof value === 'boolean') {
    return `${value}`;
  }
  return `'${value}'`;
};

const render = (ast) => {
  const typeFormats = {
    nested: (fullName, node, fn) => fn(node.children, fullName),
    unchanged: fullName => `Property '${fullName.join('.')}' is unchanged`,
    changed: (fullName, node) =>
      `Property '${fullName.join('.')}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
    added: (fullName, node) => `Property '${fullName.join('.')}' was added with value: ${stringify(node.value)}`,
    removed: fullName => `Property '${fullName.join('.')}' was removed`,
  };

  const iter = (tree, fullName = []) =>
    tree.map((node) => {
      const updatedFullName = [...fullName, node.name];
      return typeFormats[node.type](updatedFullName, node, iter);
    }).join('\n');

  return iter(ast, []);
};

export default render;
