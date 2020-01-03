<template>
  <div class="swapi-planet">
    <span v-if="planet.name">{{ planet.name }}</span>
    <ul>
      <template
        v-for="key in ['rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population']"
      >
        <li
          v-if="planet[key]"
          :key="key"
        >
          {{ key }}: {{ planet[key] }}
        </li>
      </template>
      <li
        v-if="planet.residents"
      >
        residents:
        <SwapiPerson
          v-for="resident in planet.residents"
          :key="resident.name"
          :person="resident"
        />
      </li>
      <li
        v-if="planet.films"
      >
        films:
        <SwapiFilm
          v-for="film in planet.films"
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
    planet: {
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

