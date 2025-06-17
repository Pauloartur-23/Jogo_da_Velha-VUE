<template>
  <div class="game-setup">
    <div class="card">
      <h1>Jogo da Velha</h1>

      <h2>Quem irá começar?</h2>
      <div class="button-group">
        <button @click="store.turno = 'X'" :class="{ selected: store.turno === 'X' }">Jogador X</button>
        <button @click="store.turno = 'O'" :class="{ selected: store.turno === 'O' }">Jogador O</button>
      </div>

      <h2>Escolha as cores dos jogadores</h2>
      <div class="color-pickers">
        <div class="color-box">
          <label>Cor do X</label>
          <input type="color" v-model="store.corX" />
        </div>
        <div class="color-box">
          <label>Cor do O</label>
          <input type="color" v-model="store.corO" />
        </div>
      </div>

      <button class="start-game" @click="startGame">Iniciar Jogo</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGameStore } from '@/stores/game';

const store = useGameStore();
const router = useRouter();

const startGame = () => {
  router.push('/jogo');
};
</script>

<style scoped>
.game-setup {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100svh;
  background: #396a67;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  border: 2px solid #000000;
  background-color: rgb(224, 255, 251);
  padding: 40px 30px;
  border-radius: 15px;
  box-shadow: 0 0 10px 25px rgba(0, 0, 0, 0.042);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #396a67;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.4rem;
  margin: 20px 0 10px;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.button-group button {
  padding: 12px 20px;
  font-size: 1rem;
  border: 2px solid #396a67;
  border-radius: 8px;
  background-color: rgb(224, 255, 251);
  transition: 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  font-weight: bold;
  color: #396a67;
}

.button-group button.selected {
  background-color: #396a67;
  color: white;
  font-weight: bold;
}

.button-group button:hover {
  background-color: #1f3a38;
  color: white;
}

.color-pickers {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 20px 0;
}

.color-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color-box label {
  font-size: 1rem;
  margin-bottom: 5px;
}

input[type="color"] {
  width: 60px;
  height: 40px;
  border: 2px solid #396a67;
  cursor: pointer;
  border-radius: 6px;
}

.start-game {
  margin-top: 30px;
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

.start-game:active {
  background-color: #1f3a38;
  box-shadow: 0px 5px 0px 3px #152726;
}
</style>
