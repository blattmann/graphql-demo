const { RESTDataSource } = require('apollo-datasource-rest');

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.co/api/';
    this.isValidUrl = new RegExp(`^${this.baseURL.replace(/\./g, '\\.')}[a-z]+/\\d+/?$`);
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
