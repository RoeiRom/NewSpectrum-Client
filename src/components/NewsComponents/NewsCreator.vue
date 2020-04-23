<template>
    <v-container class="postsContainerStyle">
        <v-row justify="center">
            <v-col cols="6">
                <v-text-field
                        :clearable="clearable"
                        :disabled="disabled"
                        label="יצירת פוסט"
                        outlined
                        placeholder="מח חדש?"
                        type="text"
                        v-model="postContent">
                    <template v-slot:prepend>
                        <v-icon>mdi-account-circle</v-icon>
                    </template>
                    <template v-slot:append>
                        <v-fade-transition leave-absolute>
                            <v-progress-circular
                                    color="primary"
                                    indeterminate
                                    size="24"
                                    v-if="loading"
                            ></v-progress-circular>
                            <img alt="" src="@/assets/images/logo_icon.png"
                                 width="24" height="24"
                                 v-else/>
                        </v-fade-transition>
                    </template>
                </v-text-field>
            </v-col>
            <v-col cols="1" class="postBtnStyle">
                <v-btn @click="publishPost"> פרסמ/י</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

    @Component({})
export default class NewsCreator extends Vue {
        postContent = '';

        loading = false;

        clearable = true;

        disabled = false;

        publishPost(): void {
          this.postContent = 'מעלה פוסט...';
          this.loading = true;
          this.clearable = false;
          this.disabled = true;
          setTimeout(() => { this.loading = false; this.postContent = ''; this.clearable = true; this.disabled = false; }, 2500);
        }
}
</script>

<style scoped>
    .postInputIconStyle {
        height: 4vh;
        width: 1.5vw;
    }
    .postsContainerStyle {
        height: 14vh;
    }
    .postBtnStyle {
        padding-top: 3vh;
    }
</style>
