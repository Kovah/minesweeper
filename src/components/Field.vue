<template>
  <div class="field">
    <span v-if="field.hasMine">🚩</span>
    <span v-if="field.mineCount > 0">{{ field.mineCount }}</span>
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
    display: flex;
    border: 1px solid #ddd;
    font-size: 14px;
    justify-content: center;
    align-items: center;
  }

  .field::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 0;
    padding-bottom: calc(100% / 1);
  }
</style>
