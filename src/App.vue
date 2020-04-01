<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from './components/AppComponents/Navbar.vue';

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {}
</script>

<style scoped>
#app {
  background-color: rgb(245, 242, 242);
  direction: rtl;
}
</style>
