<template>
  <v-stepper v-model="stepperStatus">
    <v-stepper-header>
      <v-stepper-step :complete="stepperStatus > 1" step="1"></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="stepperStatus > 2" step="2"></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"></v-stepper-step>
    </v-stepper-header>

<div>
    <img v-for="image in images" :src="image" :key="image" class="stepperImagesStyle" />
</div>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="stepperCardStyle d-flex-justify-center" color="grey lighten-2" >

            <OrderPlace />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card color="grey lighten-2" class="stepperCardStyle"></v-card>

      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card color="grey lighten-2" class="stepperCardStyle"></v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>p

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OrderPlace from '@/components/FoodOrderComponents/OrderPlace.vue';

@Component({
  components: {
    OrderPlace,
  },
})
export default class FoodOrder extends Vue {
  stepperStatus = '1';

  /* eslint-disable */
  images = [
    require("@/assets/images/FoodOrderImages/Hamburger.png"),
    require("@/assets/images/FoodOrderImages/Nudles.png"),
    require("@/assets/images/FoodOrderImages/Pizza.png"),
    require("@/assets/images/FoodOrderImages/Sushi.png")
  ];
  /* eslint-enable */
}
</script>


<style scoped>

.v-card {
    display: flex;
    justify-content: center;
}
.stepperImagesStyle {
  width: 16vw;
  height: 13vh;
}
.stepperCardStyle {
  height: 52vh;
}

</style>
