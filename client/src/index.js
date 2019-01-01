import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import ApolloClient from 'apollo-client';

const GRAPHQL_ENDPOINT = 'ws://localhost:4000/subscription';

const subscriptionClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
  connectionParams: {
    // Connection parameters to pass some validations 
    // on server side during first handshake
  }
});

const apolloClient = new ApolloClient({
  link: subscriptionClient,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
