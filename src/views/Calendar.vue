<template>
    <div class="calendarWrapper">
        <CategoriesBar
            :categories="categories"
            :title="calendarDateTitle"
            @prevPressed="$refs.calendar.prev()"
            @nextPressed="$refs.calendar.next()"
        />
        <v-calendar
            v-model="startTimeCalendar"
            class="calendar"
            :events="calendarEvents"
            event-overlap-mode="stack"
            :event-color="getEventColor"
            event-text-color="black"
            ref="calendar"
        />
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { mapActions } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

import CategoriesBar from '@/components/CalendarComponents/categoriesBar.vue';
import { AllEvents } from '@/db-service/Events/queries';
import { AllCategories } from '@/db-service/Categories/queries';
import Event from '@/models/Event';
import Category from '@/models/Category';
import graphqlAxios from '@/plugins/axiosGraphql';

interface CalendarEvent {
    name: string;
    start: string;
    end: string;
    color: string;
}

@Component({
  components: {
    CategoriesBar,
  },
  // apollo: {
  //   allEvents: {
  //     query: AllEvents,
  //   },
  //   allCategories: {
  //     query: AllCategories,
  //   },
  // },
})
export default class Calendar extends Vue {
    startTimeCalendar = Calendar.formatDate(new Date(), false);

    get calendarDateTitle(): string {
      const startDate: Date = new Date(this.startTimeCalendar);
      const monthName = startDate.toLocaleString('he', { month: 'long' });
      return `${monthName} ${startDate.getFullYear()}`;
    }

    allEvents: {nodes: Event[]} = {
      nodes: [],
    };

    allCategories: {nodes: Category[]} = {
      nodes: [],
    };

    get events(): Event[] {
      return this.allEvents.nodes;
    }

    get categories(): Category[] {
      return this.allCategories.nodes;
    }

    get calendarEvents(): CalendarEvent[] {
      return this.events.map((event: Event) => ({
        name: event.title,
        start: Calendar.formatDate(new Date(event.startDate), !event.isAllDay),
        end: Calendar.formatDate(new Date(event.endDate), !event.isAllDay),
        color: event.category.color,
      }));
    }

    /* eslint-disable */
    getEventColor(event: CalendarEvent): string {
      return event.color;
    }
    /* eslint-enable */
    
    public mounted() {
      axios.all([
        graphqlAxios(AllEvents),
        graphqlAxios(AllCategories),
      ]).then(axios.spread((...responses) => {
        this.allEvents = responses[0].data.data.allEvents;
        this.allCategories = responses[1].data.data.allCategories;
      }));
    }

    static formatDate(dateToFormat: Date, withTime: boolean): string {
      const date = `${dateToFormat.getFullYear()}-${dateToFormat.getMonth() + 1}-${dateToFormat.getDate()}`;
      return withTime ? `${date} ${dateToFormat.getHours()}:${dateToFormat.getMinutes()}` : date;
    }
}
</script>

<style scoped>
  .calendarWrapper {
    width: 100%;
    margin-top: 5vh;
  }
</style>
