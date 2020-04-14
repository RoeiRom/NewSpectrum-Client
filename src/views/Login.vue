<template>
      <v-card class="card">
        <img class="logo" :src="require('@/assets/images/login-title.png')"/>
        <v-form class="form">
            <v-text-field
            single-line
            outlined
            prepend-inner-icon="perm_identity"
            placeholder="הזן שם משתמש"
            />
            <v-text-field
            single-line
            outlined
            prepend-inner-icon="mdi-key-outline"
            placeholder="הזן סיסמא"
            />
            <v-checkbox label="זכור אותי"/>
            <v-btn class="login-button">
                התחבר
            </v-btn>
        </v-form>
      </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class Login extends Vue {
  private dialog = false;
}
</script>

<style scoped>
  .card {
    border: black solid 0.5px;
    width: 25vw;
    height: fit-content;
    display: flex;
    flex-direction: column;
  }
  .logo {
      width: fit-content;
      margin: 0 auto;
  }
  .form {
    margin: 1vh 2vw;
    display: flex;
    flex-direction: column;
  }
  .login-button {
    border: black solid 0.5px;
    margin: 1vh auto;
  }
</style>
