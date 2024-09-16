import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router'; 
import axios from './axios'; // Import the configured axios instance

loadFonts();

const app = createApp(App);

app.config.globalProperties.$axios = axios; // Make axios available globally

app
  .use(vuetify)
  .use(router)
  .mount('#app');
