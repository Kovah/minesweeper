<template>
  <div v-bind:class="'field ' + fieldClass" v-on:click="onFieldClick">
    <span v-if="this.revealed && field.hasMine">🚩</span>
    <span v-if="this.revealed && field.mineCount > 0">{{ field.mineCount }}</span>
  </div>
</template>

<script>
  export default {
    name: 'Field',
    props: ['field'],
    data: () => ({
      revealed: false
    }),
    methods: {
      onFieldClick () {
        this.revealed = true;
        this.$store.commit('revealedField', this.field);
        this.$store.commit('incrementClicks');
      },
      setRevealed (isRevealed) {
        this.revealed = isRevealed;
      }
    },
    computed: {
      fieldClass () {
        if (!this.revealed) {
          return '';
        }

        return this.field.hasMine ? 'exploded' : 'revealed';
      }
    }
  };
</script>

<style scoped>
  .field {
    display: flex;
    border: 1px solid #ddd;
    background: #eee;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .field::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 0;
    padding-bottom: calc(100% / 1);
  }

  .field.revealed {
    background: none;
  }

  .field.exploded {
    background: lightcoral;
  }
</style>
