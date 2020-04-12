<template>
    <div class="bar">
        <v-btn icon class="nav-button">
            <v-icon color="black" @click="$emit('prevPressed')">
                mdi-chevron-right
            </v-icon>
        </v-btn>
        <div class="categories">
            <v-btn icon class="add-button" small>
            <v-icon color="black" @click="$emit('addEventButtonPressed')">
                mdi-plus
            </v-icon>
        </v-btn>
            <div v-for="category in categories" :key="category.id"
                class="category" :style="{ backgroundColor: category.color }">
                {{ category.title }}
            </div>
        </div>
        <h2>{{title}}</h2>
        <v-btn icon class="nav-button">
            <v-icon color="black" @click="$emit('nextPressed')">
                mdi-chevron-left
            </v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Category from '@/models/Category';
import { AllCategories } from '@/db-service/Categories/queries';

@Component({
  apollo: {
    allCategories: {
      query: AllCategories,
    },
  },
})
export default class CategoriesBar extends Vue {
    @Prop()
    title!: string;

    get categories(): Category[] {
      if (this.$data.allCategories !== undefined) {
        return this.$data.allCategories.nodes;
      }
      return [];
    }
}
</script>

<style scoped>
    .nav-button {
        margin: 0 0.25vw;
        flex: 1;
    }
    .add-button {
        border: solid black 1px;
        flex: 0.75;
    }
    .categories {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex: 25;
    }
    .category {
        font-weight: bold;
        border-radius: 9%;
        border: solid black 0.5px;
        width: 10%;
        padding: 0.5% 0;
        text-align: center;
        margin-right: 1%;
    }
    .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border: solid black 1px;
        padding: 1vh 0;
    }
    h2 {
        flex: 4;
        justify-content: flex-end;
        display: flex;
    }
</style>
