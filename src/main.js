import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory} from 'vue-router';
import VueConfetti from 'vue-confetti'
import App from './App.vue'
import HomeVue from './views/Home.vue';
import FavoritesVue from './views/Favorites.vue';


const routes = [
  {
    path: '/',
    name : 'home',
    component : HomeVue
  },
  {
    path: '/favorites',
    name : 'favorites',
    component : FavoritesVue
  },
]
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

const store = createStore({
    state () {
      return {
        favorites : []
      }
    },
    mutations: {
      updateFavorites(state, payload){
        this.state.favorites = payload;
      }
    }
})

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueConfetti);
app.mount('#app');

