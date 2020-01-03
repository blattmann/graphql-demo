import fs from 'fs'
import path from 'path'

const schemas = [
  fs.readFileSync(path.resolve(__dirname, './schema-chat.graphql'), { encoding: 'utf8' }),
  fs.readFileSync(path.resolve(__dirname, './schema-swapi-people.graphql'), { encoding: 'utf8' }),
  fs.readFileSync(path.resolve(__dirname, './schema-swapi-starships.graphql'), { encoding: 'utf8' }),
  fs.readFileSync(path.resolve(__dirname, './schema-swapi-planets.graphql'), { encoding: 'utf8' }),
  fs.readFileSync(path.resolve(__dirname, './schema-swapi-films.graphql'), { encoding: 'utf8' }),
  fs.readFileSync(path.resolve(__dirname, './schema-swapi-vehicles.graphql'), { encoding: 'utf8' }),
  fs.readFileSync(path.resolve(__dirname, './schema-swapi-species.graphql'), { encoding: 'utf8' }),
];

export default schemas.join('\n');
