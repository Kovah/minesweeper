<template>
  <div class="hello">
    <p>
      <button v-on:click="onGenerateClick">Generate new Field</button>
      <span v-if="isInitializingGame">Generating a new Mine Field for you...</span>
    </p>
    <PlayArea v-if="gameIsReady"/>
  </div>
</template>

<script>
  import PlayArea from './PlayArea';

  export default {
    name: 'Generator',
    components: {PlayArea},
    computed: {
      isInitializingGame () {
        return this.$store.state.game.gameInitActive;
      },
      gameIsReady () {
        return !this.$store.state.game.gameInitActive
          && this.$store.getters.mines.length > 0;
      }
    },
    methods: {
      onGenerateClick () {
        this.$store.commit('setGameInitState', true);

        this.$store.commit('resetGame');

        this.generateMines();
        this.generateFields();

        setTimeout(() => {
          this.$store.commit('setGameInitState', false);
        }, 1000);
      },

      generateMines () {
        const mineLimit = this.$store.state.settings.mineCount;
        for (let i = 1; i <= mineLimit; i++) {
          this.generateNewMine();
        }
      },

      generateNewMine () {
        const xMax = this.$store.state.settings.fieldSize.x;
        const yMax = this.$store.state.settings.fieldSize.y;

        let positionFound = false;
        let xPos = 0;
        let yPos = 0;

        do {
          xPos = this.randomInteger(0, xMax);
          yPos = this.randomInteger(0, yMax);

          if (!this.checkIfPositionHasMine(xPos, yPos)) {
            positionFound = true;
          }
        } while (positionFound === false);

        this.$store.commit('addNewMine', [xPos, yPos]);
      },

      checkIfPositionHasMine (xPos, yPos) {
        return this.$store.state.game.mines.filter(mine => {
          return mine[0] === xPos && mine[1] === yPos;
        }).length > 0;
      },

      generateFields () {
        for (let xPos = 0; xPos < this.$store.state.settings.fieldSize.x; xPos++) {
          for (let yPos = 0; yPos < this.$store.state.settings.fieldSize.y; yPos++) {
            this.saveNewField(xPos, yPos);
          }
        }
      },

      saveNewField (xPos, yPos) {
        const fieldHasMine = this.checkIfPositionHasMine(xPos, yPos);
        const mineCount = fieldHasMine ? 0 : this.countMinesAroundField(xPos, yPos);

        this.$store.commit('addNewField', {
          x: xPos,
          y: yPos,
          mineCount: mineCount,
          hasMine: fieldHasMine
        });
      },

      countMinesAroundField (xPos, yPos) {
        const xMin = xPos > 0 ? xPos - 1 : 0;
        const xMax = xPos < this.$store.state.settings.fieldSize.x - 1
          ? xPos + 1
          : this.$store.state.settings.fieldSize.x - 1;

        const yMin = yPos > 0 ? yPos - 1 : 0;
        const yMax = yPos < this.$store.state.settings.fieldSize.y - 1
          ? yPos + 1
          : this.$store.state.settings.fieldSize.y - 1;

        return this.$store.state.game.mines.filter(mine => {
          return mine[0] >= xMin && mine[0] <= xMax
            && mine[1] >= yMin && mine[1] <= yMax;
        }).length;
      },

      randomInteger (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
  };
</script>
