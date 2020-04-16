<template>
  <nav>
    <v-toolbar height="100">
      <img :src="require('@/assets/images/logo.png')" />
      <v-progress-circular v-if="displayProgressBar"
                           indeterminate
                           color="primary"
                           class="circle-progress"
                           :size="40" />
      <v-spacer></v-spacer>
      <router-link v-for="route in routes" :key="route.href" :to="route.href ">
        <v-icon color="black">{{ route.icon }}</v-icon>
      </router-link>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators';
import { Component, Vue } from 'vue-property-decorator';

import StoreModule from '@/store/storeModule';

interface Link {
  href: string;
  icon: string;
}

@Component
export default class Navbar extends Vue {
  routes: Link[] = [
    {
      icon: 'mdi-calendar-blank',
      href: '/calendar',
    },
    {
      icon: 'mdi-food',
      href: '/orderFood',
    },
    {
      icon: 'mdi-message-text',
      href: '/news',
    },
    {
      icon: 'mdi-cart',
      href: '/shoppingList',
    },
    {
      icon: 'mdi-download',
      href: '/downloads',
    },
  ];

  get displayProgressBar() {
    const storeModule = getModule(StoreModule, this.$store);
    return (storeModule.displayProgressBar);
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  margin: auto 1vw;
  border-radius: 50%;
  border: black solid 0.5px;
  padding: 2vh;
}
a:hover {
  background-color: lightgray;
}
.router-link-exact-active {
  background-color: lightgray;
}
.circle-progress {
  position: absolute;
  z-index: 100;
  right: 17vh;
  top: 5vh;
}
</style>
