<template>
    <div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Download from '@/models/Download';

@Component({
  apollo: {
    allDownloads: {
      // query: AllDownloads,
    },
  },
})
export default class Downloads extends Vue {
  get downloads(): Download[] {
    if (this.$data.allDownloads !== undefined) {
      return this.$data.allDownloads.nodes;
    }
    return [];
  }
}
</script>

<style scoped>

</style>
