import './style.css'
import App from './App.vue'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './routes/index';
import axiosInterceptor from './utils/axios-interceptor'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(axiosInterceptor());

app.mount('#app')
