<template>
    <v-container>
        <v-row>
            <v-col cols="7">
                <v-text-field
                        clearable
                        label="יצירת פוסט"
                        placeholder="מח חדש?"
                        outlined
                        type="text"
                        v-model="postContent" >
                    <template v-slot:prepend>
                        <v-icon>mdi-account-circle</v-icon>
                    </template>
                    <template v-slot:append>
                        <v-fade-transition leave-absolute>
                            <v-progress-circular
                                    color="info"
                                    indeterminate
                                    size="24"
                                    v-if="loading"
                            ></v-progress-circular>
                            <img alt="" src="@/assets/images/logo_icon.png" v-else
                                 class="postInputIconStyle"/>
                        </v-fade-transition>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

    @Component({})
export default class NewsCreator extends Vue {
        postContent = '';
}
</script>

<style scoped>
    .postInputIconStyle {
        height: 4vh;
        width: 1.5vw;
    }
</style>
