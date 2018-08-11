import prettyRenderer from './pretty-renderer';
import plainRenderer from './plain-renderer';

const renderFormats = {
  pretty: prettyRenderer,
  plain: plainRenderer,
};

export default (ast, format) =>
  renderFormats[format](ast);
