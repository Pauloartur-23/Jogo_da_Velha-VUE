<template>
  <div class="game-container">
    <div class="scoreboard">
      <div class="players">
        <div class="player">
          <h2>Jogador X</h2>
          <p>0{{ placarX }}</p>
        </div>
        <div class="timer">
          <h2>Tempo restante</h2>
          <p>{{ formattedTime }}</p>
        </div>
        <div class="player">
          <h2>Jogador O</h2>
          <p>0{{ placarO }}</p>
        </div>
      </div>
    </div>

    <div class="status">
      <h2 v-if="!gameOver">Vez de: {{ turno }}</h2>
      <h2 v-else-if="winner">Jogador {{ winner }} venceu!</h2>
      <h2 v-else>Velha!</h2>
    </div>

    <div class="board">
      <button v-for="(btn, index) in buttons" :key="index" @click="handleClick(index)"
        :disabled="btn.value !== '' || gameOver"
        :style="{ color: btn.value === 'X' ? store.corX : btn.value === 'O' ? store.corO : '' }" class="cell">
        {{ btn.value }}
      </button>
    </div>

    <div class="controls">
      <button v-if="!autoResetting" @click="resetScore" class="reset-btn">Resetar</button>
      <button @click="backbutton" class="back">Voltar</button>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game';

export default {
  data() {
    const store = useGameStore();
    return {
      store,
      turno: store.turno,
      buttons: Array(9).fill().map(() => ({ value: '' })),
      listaX: [],
      listaO: [],
      placarX: 0,
      placarO: 0,
      gameOver: false,
      winner: null,
      autoResetting: false,
      remainingSeconds: 3600, // 1 hora em segundos
      timerInterval: null
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.remainingSeconds / 60).toString().padStart(2, '0');
      const seconds = (this.remainingSeconds % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.remainingSeconds > 0) {
          this.remainingSeconds--;
        } else {
          clearInterval(this.timerInterval);
          this.backbutton();
        }
      }, 1000);
    },
    backbutton() {
      this.$router.push('/');
    },
    handleClick(index) {
      if (this.buttons[index].value === '' && !this.gameOver) {
        this.buttons[index].value = this.turno;
        (this.turno === 'X' ? this.listaX : this.listaO).push(index);

        if (this.checkWinner()) {
          this.winner = this.turno;
          this.gameOver = true;
          this.turno === 'X' ? this.placarX++ : this.placarO++;
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
    checkWinner() {
      const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      const lista = this.turno === 'X' ? this.listaX : this.listaO;
      return winCombos.some(combo => combo.every(i => lista.includes(i)));
    },
    reset() {
      this.buttons = Array(9).fill().map(() => ({ value: '' }));
      this.listaX = [];
      this.listaO = [];
      this.turno = this.turno === 'X' ? 'O' : 'X';
      this.winner = null;
      this.gameOver = false;
    },
    resetScore() {
      this.placarX = 0;
      this.placarO = 0;
      this.reset();
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
  background: rgb(224, 255, 251);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #222;
  padding: 10px;
  user-select: none;
}

.scoreboard {
  background: #396a67;
  color: #eee;
  padding: 8px 15px;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 0 6px 15px rgba(0, 0, 0, 0.09);
  border: 2px solid #0d1b2a;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 3px solid black;
}

.players {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.players > div {
  flex: 1;
  text-align: center;
}

.players h2 {
  margin: 0 0 6px;
  font-size: 1.1rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}

.players .player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
}

.players .player p {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #444c56;
  box-shadow:
    inset 0 2px 5px rgba(255,255,255,0.2),
    0 3px 6px rgba(0,0,0,0.3);
  transition: transform 0.2s ease;
}

.timer {
  font-size: 1.3rem;
  font-weight: 700;
  color: #f0f0f0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  border-left: 2px solid #444c56;
  border-right: 2px solid #444c56;
}

.status {
  font-size: 1.6rem;
  font-weight: 700;
  color: #396a67;
  margin-bottom: 20px;
  text-shadow: 0 2px 5px rgba(0,0,0,0.3);
  min-height: 2em;
  text-align: center;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 90px);
  grid-template-rows: repeat(3, 90px);
  margin-bottom: 20px;
  background: #492e00;
  padding: 15px;
  border-radius: 18px;
  box-shadow: 0 8px 25px #396a67;
  user-select: none;
}

.cell {
  background-image: url("../public/images.jpeg");
  border: 2.5px solid #000000;
  font-size: 3rem;
  font-weight: 900;
  color: inherit;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:
    0 0 10px 2px rgba(65, 39, 0, 0.8),
    inset 3px 3px 10px rgba(89, 52, 0, 0.9);
  transition: background-color 0.25s ease, transform 0.15s ease;
  user-select: none;
}

.cell:hover:not(:disabled) {
  background-color: #3b1b00;
  transform: scale(1.02);
  box-shadow:
    0 0 10px 2px rgba(65, 39, 0, 0.8),
    inset 3px 3px 10px rgba(126, 74, 1, 0.9);
}

.cell:disabled {
  cursor: default;
  opacity: 0.85;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.reset-btn, .back {
  background-color: #396a67;
  color: white;
  padding: 12px 30px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 1.5s ease;
  box-shadow: 0px 5px 0px 6px #1f3a38 ;
}

.reset-btn:active, .back:active {
  background-color: #1f3a38;
  box-shadow: 0px 5px 0px 3px #000000;
}

.reset-btn {
  background-color: rgb(224, 255, 251);
  color: #396a67;
  box-shadow: 0px 5px 0px 6px #1f3a38;
}



</style>


