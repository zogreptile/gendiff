import prettyRenderer from './pretty-renderer';
import plainRenderer from './plain-renderer';
import jsonRenderer from './json-renderer';

const renderFormats = {
  pretty: prettyRenderer,
  plain: plainRenderer,
  json: jsonRenderer,
};

export default (ast, format) =>
  renderFormats[format](ast);
