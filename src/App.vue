<template>
  <div id="app">
    <h1>Minesweeper</h1>
    <Generator/>
  </div>
</template>

<script>
  import Generator from './components/Generator.vue';

  export default {
    name: 'app',
    components: {
      Generator
    }
  };
</script>

<style>
  body {
    font-family: sans-serif;
  }
</style>
