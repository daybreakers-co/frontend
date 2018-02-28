import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import './reset.css';
import './App.css';
import './forms.css';
import './layout.css';
import './typography.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from "apollo-link-batch-http";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import { ApolloProvider } from "react-apollo"
import { BrowserRouter } from 'react-router-dom'

const httpLink = new BatchHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  batchInterval: 10
});

const middlewareLink = new ApolloLink((operation, forward) => {
  if (localStorage.getItem('authenticationToken')) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${localStorage.getItem('authenticationToken')}`
      }
    });
  };

  return forward(operation)
})

const link = middlewareLink.concat(httpLink);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Section",
          possibleTypes: [
            {name: "TextSection"},
            {name: 'PhotoRowSection'},
            {name: 'HeroSection'}
          ],
        },
      ],
    },
  }
})

const cache = new InMemoryCache({
  fragmentMatcher: fragmentMatcher
})

const client = new ApolloClient({
  link: link,
  cache: cache,
})

ReactDOM.render(<ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
