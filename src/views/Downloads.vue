<template>
    <div class="container">
      <v-card v-for='download in downloads' class="card" :key='download.title'>
          <v-icon class="material-icons icon" color='black' size='15vh'>
            system_update_alt
          </v-icon>
          <v-divider class='divider'/>
          {{download.title}}
      </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Download from '@/models/Download';
import { AllDownloads } from '@/db-service/Downloads/queries';

@Component({
  apollo: {
    allDownloads: {
      query: AllDownloads,
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
  .container {
    display: table;
  }
  .card {
    border: black solid 0.5px !important;
    width: 20%;
    height: 25vh;
    margin: 1vw;
    text-align: center;
    display: inline-block;
  }
  .icon {
    margin: 1vh 0
  }
  .divider {
    margin: 0 1vw;
  }
</style>
