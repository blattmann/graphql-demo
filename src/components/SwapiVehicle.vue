<template>
  <div class="swapi-vehicle">
    <span v-if="vehicle.name">{{ vehicle.name }}</span>
    <ul>
      <template
        v-for="key in ['model', 'manufacturer', 'cost_in_credits', 'length', 'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity', 'consumables', 'vehicle_class']"
      >
        <li
          v-if="vehicle[key]"
          :key="key"
        >
          {{ key }}: {{ vehicle[key] }}
        </li>
      </template>
      <li
        v-if="vehicle.pilots"
      >
        pilots:
        <SwapiPerson
          v-for="pilot in vehicle.pilots"
          :key="pilot.name"
          :person="pilot"
        />
      </li>
      <li
        v-if="vehicle.films"
      >
        films:
        <SwapiFilm
          v-for="film in vehicle.films"
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
    vehicle: {
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


