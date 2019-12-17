<template>
  <div class="hello">
    <p>
      <button v-on:click="onGenerateClick">Generate new Field</button>
      <span v-if="isInitializingGame">Generating a new Mine Field for you...</span>
    </p>
    <PlayArea v-if="gameIsReady" :mines="mines" :fields="fields"/>
  </div>
</template>

<script>
  import PlayArea from './PlayArea';

  export default {
    name: 'Generator',
    components: {PlayArea},
    props: ['standards'],
    data: () => ({
      gameInitActive: false,
      fields: [],
      mines: []
    }),
    computed: {
      isInitializingGame () {
        return this.gameInitActive;
      },
      gameIsReady () {
        return !this.gameInitActive && this.mines.length > 0;
      }
    },
    methods: {
      onGenerateClick () {
        this.gameInitActive = true;

        this.mines = [];
        this.fields = [];
        this.generateMines();
        this.generateFields();

        setTimeout(() => {
          this.gameInitActive = false;
        }, 1000);
      },

      generateMines () {
        const mineLimit = this.standards.mineCount;
        for (let i = 1; i <= mineLimit; i++) {
          this.generateNewMine();
        }
      },

      generateNewMine () {
        const xMax = this.standards.fieldSize.x;
        const yMax = this.standards.fieldSize.y;

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

        this.mines.push([xPos, yPos]);
      },

      checkIfPositionHasMine (xPos, yPos) {
        return this.mines.filter(mine => {
          return mine[0] === xPos && mine[1] === yPos;
        }).length > 0;
      },

      generateFields () {
        for (let xPos = 0; xPos < this.standards.fieldSize.x; xPos++) {
          for (let yPos = 0; yPos < this.standards.fieldSize.y; yPos++) {
            this.saveNewField(xPos, yPos);
          }
        }
      },

      saveNewField (xPos, yPos) {
        const fieldHasMine = this.checkIfPositionHasMine(xPos, yPos);
        const mineCount = fieldHasMine ? 0 : this.countMinesAroundField(xPos, yPos);

        this.fields.push({
          x: xPos,
          y: yPos,
          mineCount: mineCount,
          hasMine: fieldHasMine
        });
      },

      countMinesAroundField (xPos, yPos) {
        const xMin = xPos > 0 ? xPos - 1 : 0;
        const xMax = xPos < this.standards.fieldSize.x - 1 ? xPos + 1 : this.standards.fieldSize.x - 1;
        const yMin = yPos > 0 ? yPos - 1 : 0;
        const yMax = yPos < this.standards.fieldSize.y - 1 ? yPos + 1 : this.standards.fieldSize.y - 1;

        return this.mines.filter(mine => {
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
