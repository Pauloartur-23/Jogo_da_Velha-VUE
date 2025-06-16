<template>
  <div>
    <button v-for="(btn, index) in buttons" :key="index" @click="handleClick(index)">
      {{ btn.value }}
    </button>
  </div>
  <button @click="reset()" id="reset">reset</button>
</template>

<script>
import { ref } from 'vue';
const lista = ref([]);

export default {
  data() {
    return {
      buttons: Array(9).fill().map(() => ({ value: '' })),
      turno: 'X'
    }
  },
  methods: {
    handleClick(index) {
      if (this.buttons[index].value === '') {
        this.buttons[index].value = this.turno;
        this.toggleTurno(index);
      }
    },
    toggleTurno(index) {
      this.turno = this.turno === 'X' ? 'O' : 'X';
      lista.value.push(index);
      alert(lista.value.join(', '));
    },
    reset() {
      this.buttons = Array(9).fill().map(() => ({ value: '' }));
      this.turno = 'X';
    }
  }
}

</script>
<style>
div {
  display: flex;
  flex-wrap: wrap;
  width: 420px;
  margin: 20px auto;
}

button {
  width: 100px;
  height: 100px;
  font-size: 24px;
  margin: 5px;
}

button:disabled {
  background-color: #ccc;
}

button:hover {
  background-color: #f0f0f0;
}

button:active {
  background-color: #ddd;
}

button:focus {
  outline: none;
  box-shadow: 0 0 5px #aaa;
}

button:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

button:disabled:focus {
  outline: none;
}

button:disabled:focus-visible {
  outline: none;
}

button:disabled:hover {
  background-color: #ccc;
}

#reset {
  width: 200px;
  height: 50px;
  background-color: #ff0000;
  border: 2px solid black;
  color: white;
  display: block;
  margin: 0px auto;
  padding: 5px 40px;
  font-size: 18px;
}
</style>
