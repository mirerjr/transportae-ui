import './style.css'
import App from './App.vue'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './routes/index';
import axiosInterceptor from './utils/axios-interceptor'
import { beforeEachGuard } from './routes/route-guard';
import filters from './utils/filters';

const pinia = createPinia();
const app = createApp(App);

router.beforeEach(beforeEachGuard);

app.use(pinia);
app.use(router);
app.use(axiosInterceptor());

app.config.globalProperties.$filters = filters;

app.mount('#app')
