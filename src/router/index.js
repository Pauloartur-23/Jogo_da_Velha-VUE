import { createRouter, createWebHistory } from 'vue-router'
import JogoView from "@/views/JogoView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'jogo ',
            component: JogoView,
            meta: {
                title: 'Jogo da Velha'
            }
        },
    ],
})

export default router