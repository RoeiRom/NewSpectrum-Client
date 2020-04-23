<template>
    <v-container>
        <v-row class="newsFeedStyle" justify="center">
            <v-col cols="8">

            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Post {
    description: string;
    date: Date;
    author: number;
    likes: number;
}

interface Comment {
    content: string;
    date: Date;
    likes: number;
    author: number;
}
    @Component({})
export default class NewsFeed extends Vue {

}
</script>

<style scoped>
    .newsFeedStyle {
        height: 62vh;
    }
</style>
