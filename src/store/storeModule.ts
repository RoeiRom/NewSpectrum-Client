import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import User from '@/models/User';

export const defaultUser: User = { id: -1, name: '' };

@Module({
  name: 'StoreModule',
})
export default class StoreModule extends VuexModule {
    displayProgressBar = false;

    user: User = defaultUser;

    @Mutation
    setDisplayProgressBarMutation(newState: boolean) {
      this.displayProgressBar = newState;
    }

    @Action
    setDisplayProgressBar(newState: boolean) {
      this.context.commit('setDisplayProgressBarMutation', newState);
    }

    @Mutation
    setUserMutation(newState: User) {
      this.user = newState;
    }

    @Action
    setUser(newState: User) {
      this.context.commit('setUserMutation', newState);
    }
}
