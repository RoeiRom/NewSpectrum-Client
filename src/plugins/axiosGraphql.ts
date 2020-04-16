import { DocumentNode } from 'graphql';
import axios, { AxiosPromise } from 'axios';
import { getModule } from 'vuex-module-decorators';

import store from '@/store/index';
import StoreModule from '@/store/storeModule';

const storeModuleInstance = getModule(StoreModule, store);

axios.interceptors.request.use(
  (config) => {
    storeModuleInstance.setDisplayProgressBar(true);
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (config) => {
    storeModuleInstance.setDisplayProgressBar(false);
    return config;
  },
  (error) => Promise.reject(error),
);

/* eslint-disable */
const graphqlAxios = (query: DocumentNode, variables?: any): AxiosPromise => {
    return axios.post(process.env.VUE_APP_DB_SERVICE_URL as string, {
    query: query.loc?.source.body,
    variables: { ...variables },
    });
};
/* eslint-enable */

export default graphqlAxios;
