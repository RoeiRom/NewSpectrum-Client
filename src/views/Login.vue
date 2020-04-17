<template>
  <v-card class="card">
    <img class="logo" :src="require('@/assets/images/login-title.png')"/>
    <div v-if="$apollo.loading" class="loading-wrapper">
      <v-progress-circular
                           indeterminate
                           color="primary"
                           :size="40" />
      <h5>מנסה להתחבר</h5>
    </div>
    <v-form class="form" v-else>
        <v-text-field
        single-line
        outlined
        prepend-inner-icon="perm_identity"
        placeholder="הזן שם משתמש"
        v-model="userName"
        />
        <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        single-line
        outlined
        prepend-inner-icon="mdi-key-outline"
        placeholder="הזן סיסמא"
        v-model="password"
        />
        <v-checkbox
        label="זכור אותי"
        v-model="rememberLogin"/>
        <h5 class='error-message'>{{this.errorMessage}}</h5>
        <v-btn
        class="login-button"
        @click="login">
            התחבר
        </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators';
import { Component, Vue } from 'vue-property-decorator';

import StoreModule from '@/store/storeModule';
import { getLoggedInUser } from '@/db-service/Users/queries';
import User from '@/models/User';

const worngAuthMessage = 'אוף! שם המשתמש ו/או הסיסמא לא נכונים. פנה למנהל המערכת כדי לשחזר אותם';

const dbErrorMessage = 'אופס! יש תקלה במערכת, נסה שוב מאוחר יותר';

@Component
export default class Login extends Vue {
  private userName = '';

  private password = '';

  private rememberLogin = false;

  private showPassword = false;

  private errorMessage = '';

  private storeModule = getModule(StoreModule, this.$store);

  login() {
    this.$apollo.query({
      query: getLoggedInUser,
      variables: {
        userName: this.userName,
        password: this.password,
      },
    }).then((data) => {
      if (data.data.loggedInUser !== undefined) {
        const loggedInUsers: User[] = data.data.loggedInUser.nodes;
        if (loggedInUsers.length !== 0) {
          this.storeModule.setUserId(loggedInUsers[0].id.toString());
          if (this.rememberLogin) {
            localStorage.setItem('userName', this.userName);
            localStorage.setItem('password', this.password);
          }
          this.$router.replace('/');
        } else {
          this.errorMessage = worngAuthMessage;
        }
      }
    })
      .catch(() => { this.errorMessage = dbErrorMessage; });
  }
}
</script>

<style scoped>
  .card {
    border: black solid 0.5px;
    width: 25vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 2vh 0;
  }
  .logo {
      width: fit-content;
      margin: 0 auto;
  }
  .form {
    margin: 0 2vw;
    display: flex;
    flex-direction: column;
  }
  .login-button {
    border: black solid 0.5px;
    margin: 0 auto;
  }
  .error-message {
    color: red;
    text-align: center;
    margin-bottom: 2vh;
  }
  .loading-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
