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
                    v-model="eventInput"
                ></v-text-field>
                <p>קטגוריה</p>
                <v-select
                    :items="categories"
                    filled
                    background-color="red"
                    color="grey"
                    class="select"
                    placeholder="בחר אירוע"
                    v-model="selectInput"
                ></v-select>
                <v-card-actions>
                <v-menu
                  v-model="isStartDateMenuOpen"
                  :close-on-content-click="false"
                  :nudge-left="250"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="בחר תאריך התחלה"
                      readonly
                      :value="startDate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                  >
                    <v-btn color="primary" @click="cancelSelectedStartDate()">Cancel</v-btn>
                    <v-btn color="primary" @click="saveSelectedStartDate()">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-spacer class="dateSpacer"></v-spacer>
                <v-menu
                  v-model="isEndDateMenuOpen"
                  :close-on-content-click="false"
                  :nudge-left="250"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="בחר תאריך סיום"
                      readonly
                      :value="endDate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                  >
                    <v-btn color="primary" @click="cancelSelectedEndDate()">Cancel</v-btn>
                    <v-btn color="primary" @click="saveSelectedEndDate()">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                </v-card-actions>
                <v-card-actions class="cardActions">
                  יום שלם
                  <v-switch
                    class="switch"
                    color="black"
                    v-model="isAllDay"
                  ></v-switch>
                  <v-spacer></v-spacer>
                  <v-btn @click="addEvent()">
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
import { createEvent } from '@/db-service/Events/mutations';

@Component({
  apollo: {
    allCategories: {
      query: AllCategories,
    },
  },
})
export default class AddEvent extends Vue {
    eventInput = '';

    isAllDay = false;

    startDate = null;

    endDate = null;

    isStartDateMenuOpen = false;

    isEndDateMenuOpen = false;

    selectInput = '';

    get categories(): Category[] {
      if (this.$data.allCategories !== undefined) {
        const categoryNames = [];
        for (let i = 0; i < this.$data.allCategories.nodes.length; i += 1) {
          categoryNames.push(this.$data.allCategories.nodes[i].tag);
        }
        return categoryNames;
      }
      return [];
    }

    saveSelectedStartDate(): void {
      this.isStartDateMenuOpen = false;
    }

    cancelSelectedStartDate(): void {
      this.startDate = null;
      this.isStartDateMenuOpen = false;
    }

    saveSelectedEndDate(): void {
      this.isEndDateMenuOpen = false;
    }

    cancelSelectedEndDate(): void {
      this.endDate = null;
      this.isEndDateMenuOpen = false;
    }

    addEvent(): void {
      this.eventInput = this.selectInput;
      if (this.eventInput && this.startDate) {
        this.$apollo
          .mutate({
            mutation: createEvent,
            variables: {
              title: this.eventInput,
              category: this.selectInput,
              startDate: this.startDate,
              endDate: this.endDate,
              isAllDay: this.isAllDay,
            },
          });

        this.eventInput = '';
        this.isAllDay = false;
        this.startDate = null;
        this.endDate = null;
        this.selectInput = '';
      } else {
        alert('title, category and date fields are required');
      }
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
    width: 10vw;
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
  .dateSpacer {
    width: 16vw;
  }
</style>
