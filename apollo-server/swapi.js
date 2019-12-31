const { RESTDataSource } = require('apollo-datasource-rest');

const cache = {};

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.co/api/';
    this.isValidUrl = new RegExp(`^${this.baseURL.replace(/\./g, '\\.')}[a-z]+/\\d+/?$`);
  }

  get(url) {
    let cached = cache[url];
    if (cached === undefined) {
      cached = super.get(url);
      cache[url] = cached;
    }
    return cached;
  }

  followLink(url) {
    if (!this.isValidUrl.test(url)) {
      return null;
    }
    return this.get(url);
  }

  async searchPeople(query) {
    const { results } = await this.get(`people/?search=${encodeURIComponent(query)}`);
    return results;
  }

  people(id) {
    return this.get(`${this.baseURL}people/${id}/`);
  }
  
  film(id) {
    return this.get(`${this.baseURL}films/${id}/`);
  }
  
  planet(id) {
    return this.get(`${this.baseURL}planets/${id}/`);
  }
  
  starship(id) {
    return this.get(`${this.baseURL}starships/${id}/`);
  }
  
}

export default StarWarsAPI;
