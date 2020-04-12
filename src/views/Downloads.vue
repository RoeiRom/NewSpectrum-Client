<template>
    <div>
      <v-card :key='download.title'
        v-for='download in downloads' class="card">
        <a :href="`${publicPath}downloads/${download.fileName}`" download class="cardContainer">
          <div>
            <v-icon class="material-icons icon" color='black' size='15vh'>
              system_update_alt
            </v-icon>
            <v-divider class='divider'/>
            {{download.title}}
          </div>
        </a>
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
  private publicPath: string | undefined = process.env.BASE_URL

  get downloads(): Download[] {
    if (this.$data.allDownloads !== undefined) {
      return this.$data.allDownloads.nodes;
    }
    return [];
  }
}
</script>

<style scoped>
  .card {
    border: black solid 0.5px;
    width: 15vw;
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
    text-decoration: blink;
    color: black;
  }
  .icon {
    padding: 2vh;
    border-radius: 50%;
  }
  .icon:hover {
    background-color: lightgray;
  }
  .divider {
    margin: 1vh 0;
  }
</style>
