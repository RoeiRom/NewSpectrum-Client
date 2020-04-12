<template>
    <div class="calendarWrapper">
        <CategoriesBar
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
import { Component, Vue } from 'vue-property-decorator';

import CategoriesBar from '@/components/CalendarComponents/categoriesBar.vue';
import { AllEvents } from '@/db-service/Events/queries';
import Event from '@/models/Event';

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
  apollo: {
    allEvents: {
      query: AllEvents,
    },
  },
})
export default class Calendar extends Vue {
    startTimeCalendar = Calendar.formatDate(new Date(), false);

    get calendarDateTitle(): string {
      const startDate: Date = new Date(this.startTimeCalendar);
      const monthName = startDate.toLocaleString('he', { month: 'long' });
      return `${monthName} ${startDate.getFullYear()}`;
    }

    get events(): Event[] {
      if (this.$data.allEvents !== undefined) {
        return this.$data.allEvents.nodes;
      }
      return [];
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
