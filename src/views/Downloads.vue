<template>
    <div class="container">
      <v-card v-for='download in downloads' class="card" :key='download.title'>
        <div class="cardContainer">
          <div>
          <v-icon class="material-icons icon" color='black' size='15vh'>
            system_update_alt
          </v-icon>
          <v-divider class='divider'/>
          {{download.title}}
          </div>
        </div>
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
    height: 30vh;
    margin: 1vw;
    text-align: center;
    display: inline-block;
  }
  .cardContainer {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    padding: 2vh;
  }
  .icon:hover {
    background-color: lightgray;
    border-radius: 50%;
  }
  .divider {
    margin: 1vh 0;
  }
</style>
