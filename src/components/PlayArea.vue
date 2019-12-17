<template>
  <div class="playarea">
    <Field
        v-for="(field, index) in fields"
        v-bind:field="field"
        v-bind:index="index"
        v-bind:key="index"
    />
  </div>
</template>

<script>
  import Field from './Field';

  export default {
    name: 'PlayArea',
    components: {Field},
    props: ['mines', 'fields']
  };
</script>

<style scoped>
  .playarea {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
  }
</style>
