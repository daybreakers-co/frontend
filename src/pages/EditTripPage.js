import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import withCurrentUser from '../components/hoc/withCurrentUser'
import EditHeader from '../components/EditHeader'
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
    })
  }

  render () {
    const { currentUser, data: { loading, error, user }} = this.props;
    if (loading) { return (<div>Loading</div>) }
    if (error)   { return (<div>ERROR: {error}</div>) }
    const { id, title, subtitle, header } = user.trip;

    return (
      <div>
        <EditHeader
          user={user}
          trip={user.trip}
          currentUser={currentUser}
          button={[
            <li key="finishEditing"><Link to={`/${user.username}/${id}`} className="Button small">Finish editing</Link></li>,
            <li key="deleteButton"><Link to={`/${user.username}/${id}/delete`} className="Button small destructive">Delete trip</Link></li>,
            ]} />

        <div className="Container full header EditTrip">
          <EditHeroHeader
            title={title}
            subtitle={subtitle}
            header={header}
            uploadParentId={id}
            uploadParentType="Trip"
            onChange={this.handleChange} />
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
