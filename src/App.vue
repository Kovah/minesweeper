<template>
  <div id="app">
    <h1>Minesweeper</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue';

  export default {
    name: 'app',
    components: {
      HelloWorld
    }
  };
</script>
