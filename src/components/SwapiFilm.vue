<template>
  <div class="swapi-film">
    <span v-if="film.title">title: {{ film.title }}</span>
    <ul>
      <template
        v-for="key in ['episode_id', 'opening_crawl', 'director', 'producer', 'release_date']"
      >
        <li
          v-if="film[key]"
          :key="key"
        >
          {{ key }}: {{ film[key] }}
        </li>
      </template>
      <li
        v-if="film.characters"
      >
        characters:
        <SwapiPerson
          v-for="character in film.characters"
          :key="character.name"
          :person="character"
        />
      </li>
      <li
        v-if="film.planets"
      >
        planets:
        <SwapiPlanet
          v-for="planet in film.planets"
          :key="planet.name"
          :planet="planet"
        />
      </li>
      <li
        v-if="film.starships"
      >
        starships:
        <SwapiStarship
          v-for="starship in film.starships"
          :key="starship.name"
          :starship="starship"
        />
      </li>
      <li
        v-if="film.vehicles"
      >
        vehicles:
        <SwapiVehicle
          v-for="vehicle in film.vehicles"
          :key="vehicle.name"
          :vehicle="vehicle"
        />
      </li>
      <li
        v-if="film.species"
      >
        species:
        <SwapiSpecies
          v-for="species in film.species"
          :key="species.name"
          :species="species"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SwapiPerson from './SwapiPerson';

export default {
  components: {
    SwapiPerson,
  },
  props: {
    film: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
ul, li {
  text-align: initial;
}
.swapi-people__person {
  border: 1px solid black;
  padding: 3px;
}
</style>

