import './bootstrap';
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import "view-ui-plus/dist/styles/viewuiplus.css";
import App from './vue/App.vue';
import router from './vue/router';

const app = createApp({});
app.use(router);
app.component('main-component', App);
app.mount("#app");
