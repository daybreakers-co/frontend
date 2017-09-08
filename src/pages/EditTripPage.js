import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { uploadPhoto } from '../utils/uploadPhoto'

import withCurrentUser from '../components/hoc/withCurrentUser'
import Header from '../components/Header'
import EditHeroHeader from '../components/EditHeroHeader'

import TripPageQuery from '../graphql/TripPageQuery.gql'
import UpdateTripQuery from '../graphql/UpdateTripQuery.gql'

class EditTripPage extends React.Component {

  static propTypes = {
    router: PropTypes.object,
    updateMutation: PropTypes.func,
    data: PropTypes.object,
  }

  handleChange = (newParams) => {
    const { data: { user: { trip: {id, header}, username } } } = this.props;

    this.props.updateMutation({
      variables: {id: id, title: newParams.title, subtitle: newParams.subtitle},
      optimisticResponse: {
        updateTrip: {
          id: id,
          title: newParams.title,
          subtitle: newParams.subtitle,
          header: header,
          '__typename': 'Trip'
        }
      },
      // After receiving mutated data from the server, update the cache
      update: (proxy, { data: { updateTrip } }) => {
        let data = tripDataByIdFromProxy(id, username, proxy);
        data.viewer.trip = updateTrip;
        proxy.writeQuery({ query: TripPageQuery, data});
      },
    })
  }

  handleDrop = (files) => {
    uploadPhoto(files[0], 'Trip', this.props.data.user.trip.id).then(image => {
      this.props.data.refetch()
    })
  }

  render () {
    const { currentUser, data: { loading, error, user }} = this.props;
    if (loading) { return (<div>Loading</div>) }
    if (error)   { return (<div>ERROR: {error}</div>) }
    const { id, title, subtitle, header } = user.trip;

    return (
      <div>
        <Header
          user={user}
          trip={user.trip}
          currentUser={currentUser}
          button={[
            <li key="deleteButton"><Link to={`/${user.username}/${id}/delete`} className="Button small destructive">Delete trip</Link></li>,
            ]} />

        <div className="Container full header EditTrip">
          <EditHeroHeader
            title={title}
            subtitle={subtitle}
            header={header}
            onChange={this.handleChange}
            onDrop={this.handleDrop} />
        </div>
      </div>
    )
  }
}

export function tripDataByIdFromProxy(tripId, username, proxy) {
  return proxy.readQuery({
    query: TripPageQuery,
    variables: {
      tripId: tripId,
      username: username
    }
  })
}

export default compose(
  graphql(UpdateTripQuery, {name: 'updateMutation'}),
  graphql(TripPageQuery, {
    options: (ownProps) => ({
      variables: {
        tripId: ownProps.match.params.tripId,
        username: ownProps.match.params.username
      }
    })
  }),
  withCurrentUser,
  withRouter
)(EditTripPage)