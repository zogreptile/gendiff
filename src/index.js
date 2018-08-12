import fs from 'fs';
import path from 'path';
import getParser from './config-parser';
import renderer from './renderers';
import getAST from './ast-parser';

export default (filePath1, filePath2, format = 'pretty') => {
  const fileExtension = path.extname(filePath1);
  const parseConfig = getParser(fileExtension);
  const parsedFile1 = parseConfig(fs.readFileSync(filePath1, 'utf-8'));
  const parsedFile2 = parseConfig(fs.readFileSync(filePath2, 'utf-8'));

  // return JSON.stringify(getAST(parsedFile1, parsedFile2), null, 4);
  return renderer(getAST(parsedFile1, parsedFile2), format);
};
