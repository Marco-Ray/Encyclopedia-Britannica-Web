import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';
import 'animate.css';
import '@/assets/fonts/fonts.css';

createApp(App).use(store).use(router).use(VueAxios, axios)
  .mount('#app');
