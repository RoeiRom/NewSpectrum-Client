<template>
    <div>
        <CategoriesBar
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
import { AllEvents } from '@/queries/Events';
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
    startTimeCalendar = '';

    get events(): Event[] {
      if (this.$data.allEvents !== undefined) {
        return this.$data.allEvents.nodes;
      }
      return [];
    }

    get calendarEvents(): CalendarEvent[] {
      return this.events.map((event: Event) => ({
        name: event.title,
        start: Calendar.formatDate(new Date(event.startDate)),
        end: Calendar.formatDate(new Date(event.endDate)),
        color: event.category.color,
      }));
    }

    /* eslint-disable */
    getEventColor(event: CalendarEvent): string {
      return event.color;
    }
    /* eslint-enable */

    static formatDate(dateToFormat: Date): string {
      return `${dateToFormat.getFullYear()}-${dateToFormat.getMonth() + 1}-${dateToFormat.getDate()} ${dateToFormat.getHours()}:${dateToFormat.getMinutes()}`;
    }
}
</script>

<style scoped>

</style>
