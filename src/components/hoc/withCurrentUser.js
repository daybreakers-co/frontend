import React from 'react';
import { graphql } from 'react-apollo';

import CurrentUserQuery from '../../graphql/CurrentUserQuery.gql'

export default (WrappedComponent) => {
  class WithCurrentUser extends React.Component {

    // Check if there is validated user logged
    isLoggedin = () => {
      return this.props.currentUser.viewer
    };

    render () {
      const { currentUser, ...rest } = this.props;
      return (
        <WrappedComponent
          {...rest}
          currentUser={this.props.currentUser.viewer}
          isLoggedin={this.isLoggedin}  />
      )
    }
  }
  return graphql(
    CurrentUserQuery,
    {name: 'currentUser',options: {fetchPolicy: 'network-only'}}
  )(WithCurrentUser);
};
