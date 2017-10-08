import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './layout.css';
import './typography.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface, IntrospectionFragmentMatcher } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom'

const networkInterface = createBatchingNetworkInterface({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  batchInterval: 10
})

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

networkInterface.use([{
  applyBatchMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('authenticationToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('authenticationToken')}`
    }
    next()
  },
}])

const client = new ApolloClient({
  networkInterface: networkInterface,
  fragmentMatcher: fragmentMatcher,
});

ReactDOM.render(<ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
