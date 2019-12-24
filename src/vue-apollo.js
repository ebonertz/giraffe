import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import { setContext } from 'apollo-link-context';
import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import config from './config.js'

// Install the vue plugin
Vue.use(VueApollo);

// Create token provider for the commercetools project
const tokenProvider = new TokenProvider({
    sdkAuth: new SdkAuth({
    host: config.host,
    projectKey: config.projectKey,
    credentials: config.credentials,
    scopes:config.scopes,
  }),
  fetchTokenInfo: sdkAuth => sdkAuth.anonymousFlow(),
});

// Call this in the Vue app file
export function createProvider() {
  const authLink = setContext((_, { headers = {} }) => tokenProvider.getTokenInfo()
    .then(tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`)
    .then(authorization => ({ headers: { ...headers, authorization } })));

  const { apolloClient } = createApolloClient({
    httpEndpoint: 'https://api.commercetools.co/js-sdk-training/graphql',
    link: authLink,
    inMemoryCacheOptions: { freezeResults: false },
  });

  return new VueApollo({ defaultClient: apolloClient });
}
