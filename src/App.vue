<template>
  <v-app>
    <Navbar />
      <v-container>
        <div class="content">
          <router-view />
        </div>
      </v-container>
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
@import 'assets/fonts/fonts.css';

#app {
  background-color: rgb(245, 242, 242);
  direction: rtl;
  font-family: 'Assistant', 'Arial-Rounded-MT-Bold-Font';
}
.content {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
