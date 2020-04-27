<template>
    <v-container>
        <v-checkbox
        :v-for="user in users"
        :value="this.didUserOrderToday(user)"/>
    </v-container>
</template>

<script lang="ts">
import { isToday } from 'date-fns';
import { Component, Vue } from 'vue-property-decorator';

import User from '@/models/User';
import { AllUsers } from '@/db-service/Users/queries';

@Component({
  apollo: {
    allUsers: {
      query: AllUsers,
      fetchPolicy: 'network-only',
    },
  },
})
export default class UsersOrderStatus extends Vue {
  get users(): User[] {
    if (this.$data.allUsers !== undefined) {
      return this.$data.allUsers.nodes;
    }
    return [];
  }

  /* eslint-disable */
  private didUserOrderToday(user: User): boolean {
    return user && user.lastFoodOrder !== undefined && 
      isToday(new Date(user.lastFoodOrder));
  }
  /* eslint-enable */
}
</script>

<style scoped>
</style>
