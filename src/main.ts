import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import apolloProvider from './plugins/apollo';

Vue.config.productionTip = false;
const ignoreWarnMessage: string[] = ['The .native modifier for v-on is only valid on components but it was used on <div>.'];

Vue.config.warnHandler = (msg) => {
  if (ignoreWarnMessage.includes(msg)) {
    /* eslint-disable */
    msg = "";
    /* eslint-enable */
  }
};

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
