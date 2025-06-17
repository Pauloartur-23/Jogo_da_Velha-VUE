// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Jogo from '@/components/JogoView.vue';
import Home from '@/components/HomeView.vue';

const routes = [
    { 
        path: '/', 
        component: Home
    },
    { 
        path: '/jogo', 
        component: Jogo
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;