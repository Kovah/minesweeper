<template>
  <div class="field">
    <span v-if="field.hasMine">X</span>
  </div>
</template>

<script>
  export default {
    name: 'Field',
    props: ['field']
  };
</script>

<style scoped>
  .field {
    flex: 0 0;
    min-width: 10px;
    min-height: 10px;
    border: 1px solid #ddd;
    font-size: 9px;
  }
</style>
