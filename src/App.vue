<template>
  <div id="app">
    <h1>Minesweeper</h1>
    <Generator :standards="standards"/>
  </div>
</template>

<script>
  import Generator from './components/Generator.vue';

  export default {
    name: 'app',
    components: {
      Generator
    },
    data: () => ({
      standards: {
        fieldSize: {
          x: 10,
          y: 10
        },
        mineCount: 15
      }
    })
  };
</script>

<style>
  body {
    font-family: sans-serif;
  }
</style>
