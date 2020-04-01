<template>
    <nav>
        <v-toolbar height=100>
            <img :src="require('@/assets/logo.png')" />
            <v-spacer></v-spacer>
            <router-link v-for="route in routes" :key="route.href" :to='route.href '>
                <v-icon>
                    {{ route.icon }}
                </v-icon>
            </router-link>
        </v-toolbar>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
    ]
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
</style>
