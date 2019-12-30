import StarWarsAPI from './swapi';

export default function() {
  return {
    swapi: new StarWarsAPI(),
  };
}
