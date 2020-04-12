import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';

@Module({
  name: 'StoreModule',
})
export default class StoreModule extends VuexModule {
    displayProgressBar = false;

    @Mutation
    setDisplayProgressBarMutation(newState: boolean) {
      this.displayProgressBar = newState;
    }

    @Action
    setDisplayProgressBar(newState: boolean) {
      this.context.commit('setDisplayProgressBarMutation', newState);
    }
}
