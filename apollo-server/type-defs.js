import fs from 'fs'
import path from 'path'

const schemas = [
  fs.readFileSync(path.resolve(__dirname, './schema-chat.graphql'), { encoding: 'utf8' }),
];

export default schemas.join('\n');
