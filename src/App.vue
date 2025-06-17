<template>
  <div class="game-container">
    <div class="scoreboard">
      <div class="scoreboard-header">
        <h2>Placar</h2>
        <div class="scoreboard-scores">
          <div class="scoreboard-score x">
            <span class="scoreboard-score-label">Jogador X</span>
            <span class="scoreboard-score-value">{{ placarX }}</span>
          </div>
          <div class="scoreboard-score o">
            <span class="scoreboard-score-label">Jogador O</span>
            <span class="scoreboard-score-value">{{ placarO }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="status">
      <h2 v-if="!gameOver">Vez de: {{ turno }}</h2>
      <h2 v-else-if="winner">Jogador {{ winner }} venceu!</h2>
      <h2 v-else>Empate!</h2>
    </div>
    <div class="board">
      <button v-for="(btn, index) in buttons" :key="index" @click="handleClick(index)"
        :disabled="btn.value !== '' || gameOver"
        :class="['cell', btn.value === 'X' ? 'x' : btn.value === 'O' ? 'o' : '']">
        {{ btn.value }}
      </button>
    </div>
    <button v-if="!autoResetting" @click="reset" class="reset-btn">Resetar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: Array(9).fill().map(() => ({ value: '' })),
      turno: 'X',
      listaX: [],
      listaO: [],
      placarX: 0,
      placarO: 0,
      gameOver: false,
      winner: null,
      winningCombo: [],
      autoResetting: false,
    };
  },
  methods: {
    handleClick(index) {
      if (this.buttons[index].value === '' && !this.gameOver) {
        this.buttons[index].value = this.turno;
        if (this.turno === 'X') {
          this.listaX.push(index);
        } else {
          this.listaO.push(index);
        }

        if (this.checkWinner()) {
          this.winner = this.turno;
          this.gameOver = true;
          if (this.turno === 'X') this.placarX++;
          else this.placarO++;
          this.autoResetting = true;
          setTimeout(() => {
            this.reset();
            this.autoResetting = false;
          }, 2000);
          return;
        }

        if (this.listaX.length + this.listaO.length === 9) {
          this.gameOver = true;
          this.autoResetting = true;
          setTimeout(() => {
            this.reset();
            this.autoResetting = false;
          }, 2000);
          return;
        }

        this.turno = this.turno === 'X' ? 'O' : 'X';
      }
    },
    reset() {
      this.buttons = Array(9).fill().map(() => ({ value: '' }));
      this.listaX = [];
      this.listaO = [];
      this.turno = 'X';
      this.gameOver = false;
      this.winner = null;
      this.winningCombo = [];
    },
    checkWinner() {
      const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      const lista = this.turno === 'X' ? this.listaX : this.listaO;
      for (const combo of winCombos) {
        if (combo.every(i => lista.includes(i))) {
          this.winningCombo = combo;
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.scoreboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #ecf0f1;
}

.scoreboard-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scoreboard h2 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
}

.scoreboard-scores {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.scoreboard-score {
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  margin-right: 2vw;
  align-items: center;
}

.scoreboard-score-label {
  font-size: 1rem;
  font-weight: 500;
}

.scoreboard-score-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.scoreboard .x {
  color: #3498db;
}

.scoreboard .o {
  color: #e74c3c;
}

.status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  margin: 20px 0;
  border: 5px solid #4a2800;
  box-shadow: 5px 3px 10px 3px rgba(63, 63, 63, 0.618);
}

.cell {
  width: 100px;
  height: 100px;
  font-size: 2rem;
  font-weight: bold;
  background-image: url('../public/images.jpeg');
  border: 2px solid #000000;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.cell.x {
  color: #3498db;
}

.cell.o {
  color: #e74c3c;
}

.cell:disabled {
  cursor: not-allowed;
}

.cell.winner {
  background-color: #ffeb3b;
  animation: winnerFlash 1s infinite alternate;
}

@keyframes winnerFlash {
  0% {
    background-color: #ffeb3b;
  }

  100% {
    background-color: #ff9800;
  }
}

.reset-btn {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #b4342b;
  color: white;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 1.5s;
  box-shadow: 0 2px 0px 2px black;
}

.reset-btn:hover {
  background-color: #8e2727;
}

.reset-btn:active {
  background-color: #b4342b;
  box-shadow: 0 2px 0px 1px black;
}
</style>
