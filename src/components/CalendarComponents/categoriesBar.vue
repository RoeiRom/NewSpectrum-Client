<template>
    <div class="bar">
        <v-btn class="nav-button" text icon @click="$emit('prevPressed')">
            <v-icon color="black">mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn class="today-button" @click="$emit('backToToday')">
                היום
        </v-btn>
        <div class="categories">
            <v-btn icon class="add-button" small>
                <v-icon color="black">
                    mdi-plus
                </v-icon>
            </v-btn>
            <div v-for="category in categories" :key="category.id"
                class="category" :style="{ backgroundColor: category.color }">
                {{ category.title }}
            </div>
        </div>
        <h2>{{title}}</h2>
        <v-btn class="nav-button" text icon @click="$emit('nextPressed')">
            <v-icon color="black">mdi-chevron-left</v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Category from '@/models/Category';

@Component({})
export default class CategoriesBar extends Vue {
  @Prop({ type: Array, default: [] })
  categories!: Array<Category>;

  @Prop({ type: String, default: '' })
  title!: string;
}
</script>

<style scoped>
    .nav-button {
        margin: 0 0.25vw;
        flex: 1;
    }
    .add-button {
        border: solid black 1px;
    }
    .today-button {
        border: solid black 1px;
        flex: 1;
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
        align-items: center;
        border: solid black 1px;
        padding: 1vh 0;
    }
    h2 {
        flex: 4;
        justify-content: flex-end;
        display: flex;
    }
</style>
