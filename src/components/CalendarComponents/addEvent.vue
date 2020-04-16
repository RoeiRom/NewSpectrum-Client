<template>
    <div id="app">
        <v-app>
            <v-card raised
                class="card"
                align=center
            >
            <v-btn icon class="exitButton">
                <v-icon class="material-icons icon" color='grey' size='5vh'>
                    clear
                </v-icon>
            </v-btn>
                <v-card-text align=center>
                    <div class="addEventTitle">
                        <h2>צור אירוע חדש</h2>
                    </div>
                    <hr class="textUnderline">
                </v-card-text>
                <v-text-field
                    class="textField"
                    placeholder="שם האירוע"
                    color="black"
                ></v-text-field>
                <p>קטגוריה</p>
                <v-select
                    :items="items"
                    filled
                    background-color="red"
                    color="grey"
                    class="select"
                    placeholder="בחר אירוע"
                ></v-select>
                <v-card-actions class="cardActions">
                    יום שלם
                    <v-switch
                        class="switch"
                        color="black"
                    ></v-switch>
                    <v-spacer></v-spacer>
                    <v-btn>
                        שמור אירוע
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-app>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Category from '@/models/Category';
import { AllCategories } from '@/db-service/Categories/queries';

@Component({
  apollo: {
    allCategories: {
      query: AllCategories,
    },
  },
})
export default class AddEvent extends Vue {
  get categories(): Category[] {
    if (this.$data.allCategories !== undefined) {
      return this.$data.allCategories.nodes;
    }
    return [];
  }
}
</script>

<style scoped>
  .card {
    width: 30vw;
    height: 60vh;
  }
  .textField {
    width: 28vw;
  }
  .addEventTitle {
    text-align: center;
    color: black;
    font-size: 1.1vw;
    }
  .textUnderline {
    margin-top: 2vh;
    margin-left: 1vw;
    width: 14vw;
  }
  .select {
    width: 17vw;
  }
  .exitButton {
      float: left;
  }
  .cardActions {
      padding: 2vw;
  }
  .switch {
      padding: 1vw;
  }
</style>
