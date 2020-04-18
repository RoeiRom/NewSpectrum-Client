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
    <Login v-if="isLoginTryCommited"/>
  </v-app>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators';
import { Component, Vue } from 'vue-property-decorator';

import User from '@/models/User';
import StoreModule from '@/store/storeModule';
import Login from '@/components/AppComponents/Login.vue';
import Navbar from '@/components/AppComponents/Navbar.vue';
import { getLoggedInUser } from '@/db-service/Users/queries';

@Component({
  components: {
    Navbar,
    Login,
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
        if (data.data.loggedInUser !== undefined) {
          const loggedInUsers: User[] = data.data.loggedInUser.nodes;
          if (loggedInUsers.length !== 0) {
            this.storeModule.setUserId(loggedInUsers[0].id.toString());
            this.$router.back();
          }
        }
      }).finally(() => { this.isLoginTryCommited = true; });
    } else {
      this.isLoginTryCommited = true;
    }
  }

  get isLoggedIn() {
    return this.storeModule.userId !== '';
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
