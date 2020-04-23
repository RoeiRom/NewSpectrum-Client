<template>
    <v-container>
        <v-card>
            <v-row>
                <NewsCreator />
            </v-row>
            <v-divider/>
            <v-row>
                <NewsFeed />
            </v-row>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewsCreator from '@/components/NewsComponents/NewsCreator.vue';
import NewsFeed from '@/components/NewsComponents/NewsFeed.vue';

    @Component({
      components: { NewsFeed, NewsCreator },
    })
export default class News extends Vue {

}

</script>

<style scoped>

</style>
