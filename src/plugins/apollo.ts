import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
});

export default new VueApollo({
  defaultClient: apolloClient,
});
