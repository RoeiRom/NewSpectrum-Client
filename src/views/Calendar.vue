<template>
    <div class="calendarWrapper">
        <CategoriesBar
            :categories="categories"
            :title="calendarDateTitle"
            @prevPressed="$refs.calendar.prev()"
            @nextPressed="$refs.calendar.next()"
            @backToToday="backToToday"
        />
        <v-calendar
            :event-more="false"
            v-model="focus"
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
import { Component, Vue } from 'vue-property-decorator';

import CategoriesBar from '@/components/CalendarComponents/categoriesBar.vue';

import { AllEvents } from '@/db-service/Events/queries';
import { AllUsersBirthdays } from '@/db-service/Users/queries';
import { AllCategories } from '@/db-service/Categories/queries';

import Event from '@/models/Event';
import Category from '@/models/Category';
import HebrewDate from '@/models/HebrewDate';
import graphqlAxios from '@/plugins/axiosGraphql';
import CategoryTag from '@/models/enum/CategoryTag';

const hebrewHolidaysUrl = 'https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=on&geo=geoname&geonameid=3448439&m=50&s=on';

interface CalendarEvent {
    name: string;
    start: string;
    end: string;
    color: string;
}

interface UserBirthday {
    name: string;
    birthday: Date;
}

@Component({
  components: {
    CategoriesBar,
  },
})
export default class Calendar extends Vue {
    focus = Calendar.getTodayFormatted();

    holidays: CalendarEvent[] = [];

    allUsersBirthdays: {nodes: UserBirthday[]} = {
      nodes: [],
    };

    allEvents: {nodes: Event[]} = {
      nodes: [],
    };

    allCategories: {nodes: Category[]} = {
      nodes: [],
    };

    get calendarDateTitle(): string {
      const startDate: Date = new Date(this.focus);
      const monthName = startDate.toLocaleString('he', { month: 'long' });
      return `${monthName} ${startDate.getFullYear()}`;
    }

    get calendarEvents(): CalendarEvent[] {
      return this.events.concat(this.holidays).concat(this.userBirthdays);
    }

    get categories(): Category[] {
      const indexedCategoryTag: {[index: string]: string} = { ...CategoryTag };
      if (this.$data.allCategories !== undefined) {
        const allCategories: Category[] = this.$data.allCategories.nodes
          .map((category: Category) => ({
            title: category.title,
            color: indexedCategoryTag[category.tag],
          }));
        return allCategories;
      }
      return [];
    }

    get events(): CalendarEvent[] {
      return this.allEvents.nodes.map(
        (event: Event) => Calendar.convertDBEventToCalendarEvent(event),
      );
    }

    get userBirthdays(): CalendarEvent[] {
      return this.allUsersBirthdays.nodes.map(
        (userBirthday: UserBirthday) => Calendar.convertBirthdayToCalendarEvent(userBirthday),
      );
    }

    private backToToday() {
      this.focus = Calendar.getTodayFormatted();
    }

    static getTodayFormatted() {
      return Calendar.formatDate(new Date(), false);
    }

    static getHolidaysFromHebrewDates(hebrewDates: HebrewDate[]): CalendarEvent[] {
      return hebrewDates.filter((date: HebrewDate) => Calendar.isHebrewDateHoliday(date))
        .map((date: HebrewDate) => (
          Calendar.convertHolidayToCalendarEvent(date)
        ));
    }

    static isHebrewDateHoliday(date: HebrewDate): boolean {
      return date.category.toLocaleLowerCase() === 'holiday'
            && (date.subcat === 'major' || date.hebrew.startsWith('ערב'));
    }

    static convertHolidayToCalendarEvent(hebrewDate: HebrewDate): CalendarEvent {
      const date = Calendar.formatDate(new Date(hebrewDate.date), false);
      return {
        name: hebrewDate.hebrew,
        start: date,
        end: date,
        color: CategoryTag.holiday,
      };
    }

    static convertDBEventToCalendarEvent(event: Event) {
      const indexedCategoryTag: {[index: string]: string} = { ...CategoryTag };
      return {
        name: event.title,
        start: Calendar.formatDate(new Date(event.startDate), !event.isAllDay),
        end: Calendar.formatDate(new Date(event.endDate), !event.isAllDay),
        color: indexedCategoryTag[event.category.tag],
      };
    }

    static convertBirthdayToCalendarEvent(userBirthday: UserBirthday) {
      const thisYearsBirthday = Calendar.formatDate(
        new Date(new Date(userBirthday.birthday)
          .setFullYear(new Date().getFullYear())), false,
      );
      return {
        name: `יום הולדת ל${userBirthday.name}`,
        start: thisYearsBirthday,
        end: thisYearsBirthday,
        color: CategoryTag.birthday,
      };
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
        graphqlAxios(AllUsersBirthdays),
        axios.get(hebrewHolidaysUrl),
      ]).then(axios.spread((...responses) => {
        this.allEvents = responses[0].data.data.allEvents;
        this.allCategories = responses[1].data.data.allCategories;
        this.allUsersBirthdays = responses[2].data.data.allUsersBirthdays;
        this.holidays = Calendar.getHolidaysFromHebrewDates(responses[3].data.items);
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
    margin-top: 2vh;
  }
</style>
