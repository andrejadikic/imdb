import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// sudo npm install -g @vue/cli 
// vue create .  
// dodati u package json u serve i build export NODE_OPTIONS=--openssl-legacy-provider
// npm run serve pokrecemo
// iz vue bootstrap uzmemo responsive meta i zalepimo u  public index.html
// npm install vue bootstrap bootstrap-vue
// kopiramo ovde iz bootstrapa kod

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'ws://127.0.0.1:4000',
  vuex: {
      store,
      actionPrefix: 'socket_',
  }
}));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/*
Pazimo da rute na backendu i frontendu ne budu iste 
jer se prvo trazi na backendu da li postoji ruta 
ukoliko ne postoji onda trazi u vue aplikaciji
*/