<template>
  <div class="swapi-starship">
    <span v-if="starship.name">{{ starship.name }}</span>
    <ul>
      <template
        v-for="key in ['model', 'manufacturer', 'cost_in_credits', 'length', 'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity', 'consumables', 'hyperdrive_rating', 'MGLT', 'starship_class']"
      >
        <li
          v-if="starship[key]"
          :key="key"
        >
          {{ key }}: {{ starship[key] }}
        </li>
      </template>
      <li
        v-if="starship.pilots"
      >
        pilots:
        <SwapiPerson
          v-for="pilot in starship.pilots"
          :key="pilot.name"
          :person="pilot"
        />
      </li>
      <li
        v-if="starship.films"
      >
        films:
        <SwapiFilm
          v-for="film in starship.films"
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
    starship: {
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

