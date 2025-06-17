import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const turno = ref('X');
  const corX = ref('#FF0000');
  const corO = ref('#0000FF');

  return {
    turno,
    corX,
    corO
  };
});