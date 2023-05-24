// import './bootstrap';
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import "view-ui-plus/dist/styles/viewuiplus.css";
import router from './vue/router';
import { createPinia } from 'pinia'
const pinia = createPinia();
import App from './vue/App.vue';
import GlobalSvgIcon from '@/vue/helpers/components/GlobalSvgIcon.vue'

import lang from 'view-ui-plus/dist/locale/en-US';
import { locale } from "view-ui-plus";
locale(lang);

const app = createApp({});
app.use(router);
app.use(pinia);
app.component('main-component', App);
app.component('svg-icon', GlobalSvgIcon);
app.mount("#app");
