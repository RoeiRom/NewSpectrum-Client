<template>
    <nav>
        <v-toolbar height=100>
            <router-link to="/downloads">
                <v-icon>
                    mdi-download
                </v-icon>
            </router-link>
            <router-link to="/shoppingList">
                <v-icon>
                    mdi-cart
                </v-icon>
            </router-link>
            <router-link to="/news">
                <v-icon>
                    mdi-message-text
                </v-icon>
            </router-link>
            <router-link to="/orderFood">
                <v-icon>
                    mdi-food
                </v-icon>
            </router-link>
            <router-link to="/calendar">
                <v-icon>
                    mdi-calendar-blank
                </v-icon>
            </router-link>
            <v-spacer></v-spacer>
            <img :src="require('@/assets/logo.png')" />
        </v-toolbar>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
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
