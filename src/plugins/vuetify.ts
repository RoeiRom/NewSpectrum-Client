import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import hebrew from 'vuetify/src/locale/he';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {
      he: hebrew,
    },
    current: 'he',
  },
  rtl: true,
});
