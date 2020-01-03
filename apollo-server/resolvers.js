import GraphQLJSON from 'graphql-type-json'
import shortid from 'shortid'


export default {
  JSON: GraphQLJSON,

  Counter: {
    countStr: counter => `Current count: ${counter.count}`,
  },


  Query: {
    hello: (root, { name }) => `Hello ${name || 'World'}!`,
    messages: (root, args, { db }) => db.get('messages').value(),
    uploads: (root, args, { db }) => db.get('uploads').value(),

    searchPeople: async (root, { query }, { dataSources } ) => {
      const result = await dataSources.swapi.searchPeople(query);
      return result;
    },

    people: (root, { id }, { dataSources } ) => {
      return dataSources.swapi.people(id);
    },
    films: (root, { id }, { dataSources } ) => {
      return dataSources.swapi.film(id);
    },
  },

  Person: {
    films(person, undefined, { dataSources }) {
      return person.films.map(url => dataSources.swapi.followLink(url));
    },
    homeworld(person, undefined, { dataSources }) {
      return dataSources.swapi.followLink(person.homeworld);
    },
    starships(person, undefined, { dataSources }) {
      return person.starships.map(url => dataSources.swapi.followLink(url));
    },
    species(person, undefined, { dataSources }) {
      return person.species.map(url => dataSources.swapi.followLink(url));
    },
    vehicles(person, undefined, { dataSources }) {
      return person.vehicles.map(url => dataSources.swapi.followLink(url));
    },
  },

  Planet: {
    residents(planet, undefined, { dataSources }) {
      return planet.residents.map(url => dataSources.swapi.followLink(url));
    },
  },

  Film: {
    planets(film, undefined, { dataSources }) {
      return film.planets.map(url => dataSources.swapi.followLink(url));
    },
    characters(film, undefined, { dataSources }) {
      return film.characters.map(url => dataSources.swapi.followLink(url));
    },
  },

  Mutation: {
    myMutation: (root, args, context) => {
      const message = 'My mutation completed!'
      context.pubsub.publish('hey', { mySub: message })
      return message
    },
    addMessage: (root, { input }, { pubsub, db }) => {
      const message = {
        id: shortid.generate(),
        text: input.text,
      }

      db
        .get('messages')
        .push(message)
        .last()
        .write()

      pubsub.publish('messages', { messageAdded: message })

      return message
    },

    singleUpload: (root, { file }, { processUpload }) => processUpload(file),
    multipleUpload: (root, { files }, { processUpload }) => Promise.all(files.map(processUpload)),

  },

  Subscription: {
    mySub: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('hey'),
    },
    counter: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).substring(2, 15) // random channel name
        let count = 0
        setInterval(() => pubsub.publish(
          channel,
          {
            // eslint-disable-next-line no-plusplus
            counter: { count: count++ },
          }
        ), 2000)
        return pubsub.asyncIterator(channel)
      },
    },

    messageAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('messages'),
    },

  },
}
