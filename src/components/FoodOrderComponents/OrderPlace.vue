<template>
    <v-container class="orderPlaceStyle">
        <!-- Header & Input -->
        <v-row justify="center" no-gutters>
            <h2>מאיפה תרצו להזמין?</h2>
        </v-row>

        <v-row justify="center" no-gutters>
            <v-col class="placeTextFieldStyle" cols="3">
                <v-text-field
                        :append-outer-icon="placeInput ? 'navigate_before' : ''"
                        @click:append-outer="sendPlaceInput"
                        @click:clear="clearPlaceInput"
                        clear-icon="mdi-close-circle"
                        clearable
                        filled
                        label="מקום"
                        type="text"
                        v-model="placeInput"
                ></v-text-field>
            </v-col>
        </v-row>

        <!-- Places list -->
        <v-row justify="center" no-gutters>
            <v-col cols="3" class="placeListsCol">
                <v-progress-circular :size="40" color="primary"
                                     indeterminate v-if="$apollo.loading"/>
                <v-container class="overflow-y-auto placesContainer" v-if="!$apollo.loading">
                    <v-list shaped v-scroll>
                        <v-list-item-group color="primary" v-model="chosenPlaceIndex">
                            <v-list-item :key="place.id" v-for="place in places">
                                <v-list-item-content>
                                    <v-list-item-title v-html="place.name"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-container>
            </v-col>
        </v-row>

        <!-- Footer & Buttons -->
        <v-row justify-md="end" no-gutters
               v-if="chosenPlaceIndex !== undefined && chosenPlaceIndex !== -1">
            <v-btn @click="locationWasChosen">
                המשך
            </v-btn>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import Place from '@/models/Place';

import { AllFoodPlacesQuery } from '@/db-service/FoodOrder/queries';
import { createFoodPlace } from '@/db-service/FoodOrder/mutations';

@Component({
  apollo: {
    allFoodPlaces: {
      query: AllFoodPlacesQuery,
      fetchPolicy: 'network-only',
    },
  },
})
export default class OrderPlace extends Vue {
        placeInput = '';

        chosenPlaceIndex = -1;

        get places(): Place[] {
          if (this.$data.allFoodPlaces !== undefined) {
            return this.$data.allFoodPlaces.nodes;
          }
          return [];
        }

        sendPlaceInput(): void {
          this.$apollo
            .mutate({
              mutation: createFoodPlace,
              variables: {
                name: this.placeInput,
              },
            })
            .then(() => {
              this.$apollo.queries.allFoodPlaces.refetch();
            })
          // eslint-disable-next-line no-console
            .catch((err) => console.log(`Error occurred - ${err}`));
          this.clearPlaceInput();
        }

        clearPlaceInput(): void {
          this.placeInput = '';
        }

        locationWasChosen(): void {
          // eslint-disable-next-line
          alert(`Place ${this.places[this.chosenPlaceIndex].name} has been chosen!`);
        }

        @Watch('chosenPlaceIndex')
        chosenPlaceIndexStateChanged(newState: number) {
          if (newState !== -1) {
            this.placeInput = this.places[this.chosenPlaceIndex].name;
          }
        }
}
</script>

<style scoped>
  .placeTextFieldStyle {
      height: 8.5vh;
  }
  .placeListsCol {
    text-align-last: center;
  }
  .placesContainer {
    max-height:28vh;
    direction: ltr;
    margin-top: 1vh;
  }
</style>
