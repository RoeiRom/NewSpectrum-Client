<template>
    <div>
        {{ this.allCategories }}
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { AllCategories } from '../queries/Categories';

@Component({
  apollo: {
    allCategories: {
      query: AllCategories,
    },
  },
})
export default class Calendar extends Vue {

}
</script>

<style scoped>

</style>
