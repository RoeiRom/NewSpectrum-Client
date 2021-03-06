<template>
  <v-app v-if="isLoggedIn">
    <Navbar/>
      <v-container>
        <div class="content">
          <router-view />
        </div>
      </v-container>
  </v-app>
  <v-app v-else>
    <router-view v-if="isLoginTryCommited"/>
  </v-app>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators';
import { Component, Vue } from 'vue-property-decorator';

import StoreModule, { defaultUser } from '@/store/storeModule';
import Navbar from '@/components/AppComponents/Navbar.vue';
import User from '@/models/User';
import { getLoggedInUser } from '@/db-service/Users/queries';

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {
  private storeModule = getModule(StoreModule, this.$store);

  isLoginTryCommited = false;

  public mounted() {
    const userName: string | null = localStorage.getItem('userName');
    const password: string | null = localStorage.getItem('password');

    if (userName !== null && password !== null) {
      this.$apollo.query({
        query: getLoggedInUser,
        variables: {
          userName,
          password,
        },
      }).then((data) => {
        const loggedInUsers: User[] = data.data.loggedInUser.nodes;
        if (loggedInUsers.length !== 0) {
          this.storeModule.setUser(loggedInUsers[0]);
          this.$router.back();
        }
      }).finally(() => { this.isLoginTryCommited = true; });
    } else {
      this.isLoginTryCommited = true;
    }
  }

  get user(): User {
    return this.storeModule.user;
  }

  get isLoggedIn(): boolean {
    return this.user !== defaultUser;
  }
}
</script>

<style scoped>
@import 'assets/fonts/fonts.css';

#app {
  background-color: rgb(245, 242, 242);
  direction: rtl;
  font-family: 'Assistant', 'Arial-Rounded-MT-Bold-Font';
}
.content {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
