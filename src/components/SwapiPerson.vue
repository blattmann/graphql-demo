<template>
  <div class="swapi-person">
    <span v-if="person.name">{{ person.name }}</span>
    <ul>
      <template
        v-for="key in ['height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender']"
      >
        <li
          v-if="person[key]"
          :key="key"
        >
          {{ key }}: {{ person[key] }}
        </li>
      </template>
      <li
        v-if="person.homeworld"
      >
        homeworld:
        <SwapiPlanet
          :planet="person.homeworld"
        />
      </li>
      <li
        v-if="person.starships"
      >
        starships:
        <SwapiStarship
          v-for="starship in person.starships"
          :key="starship.name"
          :starship="starship"
        />
      </li>
      <li
        v-if="person.vehicles"
      >
        vehicles:
        <SwapiVehicle
          v-for="vehicle in person.vehicles"
          :key="vehicle.name"
          :vehicle="vehicle"
        />
      </li>
      <li
        v-if="person.species"
      >
        species:
        <SwapiSpecies
          v-for="species in person.species"
          :key="species.name"
          :species="species"
        />
      </li>
      <li
        v-if="person.films"
      >
        films:
        <SwapiFilm
          v-for="film in person.films"
          :key="film.name"
          :film="film"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SwapiFilm from './SwapiFilm';
import SwapiPlanet from './SwapiPlanet';
import SwapiSpecies from './SwapiSpecies';
import SwapiVehicle from './SwapiVehicle';
import SwapiStarship from './SwapiStarship';

export default {
  components: {
    SwapiFilm,
    SwapiPlanet,
    SwapiSpecies,
    SwapiVehicle,
    SwapiStarship,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
ul, li {
  text-align: initial;
}
.swapi-person {
  border: 1px solid black;
  padding: 3px;
  margin-top: 5px;
}
</style>
