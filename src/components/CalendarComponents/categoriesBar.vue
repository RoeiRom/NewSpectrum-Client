<template>
    <div class="bar">
        <v-btn icon>
            <v-icon color="black" @click="$emit('prevPressed')">
                mdi-chevron-right
            </v-icon>
        </v-btn>
        <div class="categories">
            <v-btn icon class="add-button">
                <v-icon color="black">
                    mdi-plus
                </v-icon>
            </v-btn>
            <div v-for="category in categories" :key="category.id"
                class="category" :style="{ backgroundColor: category.color }">
                {{ category.title }}
            </div>
        </div>
        <v-btn icon>
            <v-icon color="black" @click="$emit('nextPressed')">
                mdi-chevron-left
            </v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Category from '@/models/Category';
import { AllCategories } from '@/queries/Categories';

@Component({
  apollo: {
    allCategories: {
      query: AllCategories,
    },
  },
})
export default class CategoriesBar extends Vue {
  get categories(): Category[] {
    if (this.$data.allCategories !== undefined) {
      return this.$data.allCategories.nodes;
    }
    return [];
  }
}
</script>

<style scoped>
    .add-button {
        border: solid black 1px;
        height: 5vh;
        width: 5vh;
    }
    .categories {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .category {
        font-weight: bold;
        border-radius: 9%;
        border: solid black 1px;
        width: 10%;
        padding: 1% 0;
        text-align: center;
        margin-right: 1%;
    }
    .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        background-color: white;
        border: solid black 1px;
        padding: 1vh 0;
    }
</style>
