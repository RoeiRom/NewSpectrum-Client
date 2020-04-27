<template>
  <v-content>
    <v-container class="container">
        <v-checkbox
        :key="user.id" v-for="user in users"
        :label="user.name"
        :disabled="user.isDisabled"
        v-model="user.isOrderingToday"
        @change="updateOrdersAmount(user.isOrderingToday)"/>
    </v-container>
    <v-divider class="divider" />
    <v-footer color="transparent" class="footer">
          <h5>{{`מספר מזמינים: ${this.ordersAmount}`}}</h5>
          <v-btn @click="onNextButtonClicked">
          המשך
          </v-btn>
    </v-footer>
  </v-content>
</template>

<script lang="ts">
import { isToday } from 'date-fns';
import { getModule } from 'vuex-module-decorators';
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';

import User from '@/models/User';
import StoreModule from '@/store/storeModule';
import { AllUsers } from '@/db-service/Users/queries';

interface UserOrderStatus {
  name: string;
  isDisabled: boolean;
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
  @Prop({ type: Function })
  onNextButtonClicked!: Function;

  private ordersAmount = 0;

  private storeModule = getModule(StoreModule, this.$store);

  get users(): UserOrderStatus[] {
    if (this.$data.allUsers !== undefined) {
      const users: User[] = this.$data.allUsers.nodes;
      const userOrderStatus: UserOrderStatus[] = users.map((user: User) => {
        const isLoggedInUser: boolean = this.isLoggedInUser(user);
        return {
          name: user.name,
          isDisabled: !isLoggedInUser,
          isOrderingToday: UsersOrderStatus.isUserOrderingToday(user, isLoggedInUser),
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

  static isUserOrderingToday(user: User, isLoggedInUser: boolean): boolean {
    return isLoggedInUser || isToday(new Date(user.lastFoodOrder));
  }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    overflow-y: visible;
}
.divider {
  margin: 2vh 2vw;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2vw;
}
</style>
