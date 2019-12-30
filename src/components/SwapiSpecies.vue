<template>
  <div class="swapi-species">
    <span v-if="species.name">{{ species.name }}</span>
    <ul>
      <template
        v-for="key in ['classification', 'designation', 'average_height', 'skin_colors', 'hair_colors', 'eye_colors', 'average_lifespan', 'homeworld', 'language']"
      >
        <li
          v-if="species[key]"
          :key="key"
        >
          {{ key }}: {{ species[key] }}
        </li>
      </template>
      <li
        v-if="species.pilots"
      >
        pilots:
        <SwapiPerson
          v-for="pilot in species.pilots"
          :key="pilot.name"
          :person="pilot"
        />
      </li>
      <li
        v-if="species.films"
      >
        films:
        <SwapiFilm
          v-for="film in species.films"
          :key="film.name"
          :film="film"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SwapiFilm from './SwapiFilm';
import SwapiPerson from './SwapiPerson';

export default {
  components: {
    SwapiFilm,
    SwapiPerson,
  },
  props: {
    species: {
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
</style>


