<template>
  <div class="apollo-example">
    <!-- Cute tiny form -->
    <div class="form">
      <label for="field-name" class="label">Name</label>
      <input
        v-model="name"
        placeholder="Type a name"
        class="input"
        id="field-name"
      >
    </div>

    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/HelloWorld.gql')"
      :variables="{ name }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">{{ data.hello }}</div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>

    <!-- Tchat example -->
    <ApolloQuery
      :query="require('../graphql/Messages.gql')"
    >
      <ApolloSubscribeToMore
        :document="require('../graphql/MessageAdded.gql')"
        :update-query="onMessageAdded"
      />

      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <div
            v-for="message of data.messages"
            :key="message.id"
            class="message"
          >
            {{ message.text }}
          </div>
        </template>
      </div>
    </ApolloQuery>

    <ApolloMutation
      :mutation="require('../graphql/AddMessage.gql')"
      :variables="{
        input: {
          text: newMessage,
        },
      }"
      class="form"
      @done="newMessage = ''"
    >
      <template slot-scope="{ mutate }">
        <form v-on:submit.prevent="formValid && mutate()">
          <label for="field-message">Message</label>
          <input
            id="field-message"
            v-model="newMessage"
            placeholder="Type a message"
            class="input"
          >
        </form>
      </template>
    </ApolloMutation>

    <div
      class="apollo-example__swapi-people"
      v-if="!swapiErrors"
    >
      <div>
        Query details:
        <input
          v-model="swapiDetails"
          id="swapiDetailsLore"
          type="radio"
          value="lore"
        />
        <label
          class="apollo-example__details-label"
          for="swapiDetailsLore"
        >
          Lore
        </label>
        <input
          v-model="swapiDetails"
          id="swapiDetailsFilms"
          type="radio"
          value="films"
        />
        <label
          class="apollo-example__details-label"
          for="swapiDetailsFilms"
        >
          Films
        </label>
      </div>
      <input
        v-model="swapiPeopleQuery"
        name="query"
      >
      <div
        v-if="$apollo.queries.swapiPeople.loading"
      >
        Loading...
      </div>
      <swapi-person
        v-else
        v-for="person in swapiPeople"
        :key="person.name"
        :person="person"
      />
    </div>
    <div v-else>
      An error occured
    </div>
  </div>
</template>

<script>
import SWAPI_PEOPLE_FILMS from '../graphql/SwapiPeopleFilms.gql'
import SWAPI_PEOPLE_LORE from '../graphql/SwapiPeopleLore.gql'
import SwapiPerson from './SwapiPerson';

export default {
  components: {
    SwapiPerson,
  },
  data () {
    return {
      name: 'Anne',
      newMessage: '',
      swapiPeopleQuery: '',
      swapiPeople: [],
      swapiErrors: false,
      swapiDetails: 'lore',
    }
  },

  apollo: {
    swapiPeople() {
      return {
        query() {
          return this.swapiDetails === 'lore' ? SWAPI_PEOPLE_LORE : SWAPI_PEOPLE_FILMS;
        },
        variables() {
          return {
            query: this.swapiPeopleQuery,
          };
        },
        update: res => res.searchPeople,
        debounce: 500,
        error: (error) => {
          this.swapiErrors = true;
          // eslint-disable-next-line no-console
          console.log('Error querying swapi for people', error);
        },
      };
    },
  },

  computed: {
    formValid () {
      return this.newMessage
    },
  },

  methods: {
    onMessageAdded (previousResult, { subscriptionData }) {
      return {
        messages: [
          ...previousResult.messages,
          subscriptionData.data.messageAdded,
        ],
      }
    },
  },
}
</script>

<style scoped>
.form,
.input,
.apollo,
.message {
  padding: 12px;
}

label {
  display: block;
  margin-bottom: 6px;
}

.input {
  font-family: inherit;
  font-size: inherit;
  border: solid 2px #ccc;
  border-radius: 3px;
}

.error {
  color: red;
}

.images {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
  grid-gap: 10px;
}

.image-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  border-radius: 8px;
}

.image {
  max-width: 100%;
  max-height: 100%;
}

.image-input {
  margin: 20px;
}

label.apollo-example__details-label {
  display: initial;
}
</style>
