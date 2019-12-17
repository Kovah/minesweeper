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
          x: 50,
          y: 50
        },
        mineCount: 25
      }
    })
  };
</script>
