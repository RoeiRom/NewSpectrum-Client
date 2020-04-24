import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import User from '@/models/User';

@Module({
  name: 'StoreModule',
})
export default class StoreModule extends VuexModule {
    displayProgressBar = false;

    userId: User | undefined = undefined;

    @Mutation
    setDisplayProgressBarMutation(newState: boolean) {
      this.displayProgressBar = newState;
    }

    @Action
    setDisplayProgressBar(newState: boolean) {
      this.context.commit('setDisplayProgressBarMutation', newState);
    }

    @Mutation
    setUserIdMutation(newState: User) {
      this.userId = newState;
    }

    @Action
    setUserId(newState: User) {
      this.context.commit('setUserIdMutation', newState);
    }
}
