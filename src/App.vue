<template>
  <div class="game-setup">
    <h1>Jogo da Velha</h1>
  <h2>Quem irá começar</h2>
  <div class="color-selection">
    <button @click="turno = 'X'" :class="{ selected: turno === 'X' }">X</button>
    <button @click="turno = 'O'" :class="{ selected: turno === 'O' }">O</button>
  </div>
  <h2>Escolha sua cor</h2>
  <div class="color-selection">
    <div>
      <p>Cor do X</p>
      <input type="color" v-model="corX" />
    </div>
    <div>
      <p>Cor do O</p>
      <input type="color" v-model="corO" />
    </div>
  </div>
  <button><router-link to="/" class="start-game">Iniciar Jogo</router-link></button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const turno = ref('X');
const corX = ref('#FF0000');
const corO = ref('#0000FF'); 
</script>

<style scoped>
.game-setup {
  max-width: 600px;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
h2 {
  text-align: center;
  margin-bottom: 10px;
}
.color-selection {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
button {
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button.selected {
  background-color: #4CAF50;
  color: white;
}
input[type="color"] {
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 5px;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

.start-game {
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
} 
.start-game:hover {
  background-color: #0056b3;
}
</style>