<template>
  <v-content v-if="$apollo.loading" class="loading-warpper">
    <v-progress-circular :size="40" color="primary"
      indeterminate/>
  </v-content>
  <v-content v-else>
    <v-container class="container">
        <v-checkbox
        class="checkbox"
        :key="user.id" v-for="user in users"
        :label="user.name"
        :disabled="!user.isLoggedInUser"
        v-model="user.isOrderingToday"
        @change="updateOrdersAmount(user.isOrderingToday)"/>
    </v-container>
    <v-divider />
    <v-footer color="transparent" class="footer">
          <h5>{{`מספר מזמינים: ${this.ordersAmount}`}}</h5>
          <v-btn @click="onNextButtonClicked">
          המשך
          </v-btn>
          <h5 class='error-message'>{{this.errorMessage}}</h5>
    </v-footer>
  </v-content>
</template>

<script lang="ts">
import { isToday } from 'date-fns';
import { getModule } from 'vuex-module-decorators';
import {
  Component, Vue,
} from 'vue-property-decorator';

import User from '@/models/User';
import StoreModule from '@/store/storeModule';
import { AllUsers } from '@/db-service/Users/queries';
import { updateLastFoodOrder } from '@/db-service/Users/mutations';
import { dbErrorMessage } from '@/utils/errorMessages';

interface UserOrderStatus {
  name: string;
  isLoggedInUser: boolean;
  isOrderingToday: boolean;
}

@Component({
  apollo: {
    allUsers: {
      query: AllUsers,
      fetchPolicy: 'network-only',
    },
  },
})
export default class UsersOrderStatus extends Vue {
  private ordersAmount = 0;

  private errorMessage = '';

  private storeModule = getModule(StoreModule, this.$store);

  get users(): UserOrderStatus[] {
    if (this.$data.allUsers !== undefined) {
      const users: User[] = this.$data.allUsers.nodes;
      const userOrderStatus: UserOrderStatus[] = users.map((user: User) => {
        const isLoggedInUser: boolean = this.isLoggedInUser(user);
        return {
          name: user.name,
          isLoggedInUser,
          isOrderingToday: UsersOrderStatus.getUserInitialStatus(user, isLoggedInUser),
        };
      });
      this.ordersAmount = userOrderStatus.filter((user) => user.isOrderingToday).length;
      return userOrderStatus;
    }
    return [];
  }

  get loggedInUser(): User {
    return this.storeModule.user;
  }

  private updateOrdersAmount(isLoggedInUserOrdering: boolean) {
    this.ordersAmount = isLoggedInUserOrdering
      ? this.ordersAmount + 1
      : this.ordersAmount - 1;
  }

  private isLoggedInUser(user: User): boolean {
    return this.loggedInUser.id === user.id;
  }

  private onNextButtonClicked(): void {
    const loggedInUserStatus: UserOrderStatus | undefined = this.users
      .find((user: UserOrderStatus) => user.isLoggedInUser);
    if (loggedInUserStatus) {
      this.$apollo.mutate({
        mutation: updateLastFoodOrder,
        variables: {
          id: this.loggedInUser.id,
          lastFoodOrder: loggedInUserStatus.isOrderingToday ? new Date() : null,
        },
      })
        .then(() => { this.$emit('passToNextStep'); })
        .catch(() => { this.errorMessage = dbErrorMessage; });
    }
  }

  static getUserInitialStatus(user: User, isLoggedInUser: boolean): boolean {
    return isLoggedInUser || isToday(new Date(user.lastFoodOrder));
  }
}
</script>

<style scoped>
.container {
    text-align: center;
    height: 22vh;
    direction: ltr;
    overflow: auto;
}
.checkbox {
  display: inline-block;
  margin: 0 1vw;
  direction: rtl;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1vh 2vw;
}
.error-message {
  color: red;
  position: fixed;
}
.loading-wrapper {
  margin: auto;
  text-align: center;
}
.error-wrapper {
  margin: auto;
  text-align: center;
}
</style>
