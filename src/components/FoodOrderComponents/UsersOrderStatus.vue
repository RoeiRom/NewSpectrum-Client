<template>
    <v-container>
        <v-checkbox
        :v-for="user in users"
        :label="user.name"
        :v-model="this.didUserOrderToday(user)"/>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { isToday } from 'date-fns';

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
  get users(): any[] {
    if (this.$data.allUsers !== undefined) {
      return this.$data.allUsers.nodes;
    }
    return [];
  }

  /* eslint-disable */
  private didUserOrderToday(user: any): boolean {
    return isToday(new Date(user.lastOrderDate));
  }
  /* eslint-enable */
}
</script>

<style scoped>
</style>
