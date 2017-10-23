import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import withCurrentUser from '../components/hoc/withCurrentUser'
import EditHeader from '../components/EditHeader'
import EditTripHeader from '../components/EditTripHeader'

import TripPageQuery from '../graphql/TripPageQuery.gql'
import UpdateTripQuery from '../graphql/UpdateTripQuery.gql'

class EditTripPage extends React.Component {

  static propTypes = {
    router: PropTypes.object,
    updateMutation: PropTypes.func,
    data: PropTypes.object,
  }

  handleChange = (newParams) => {
    const { data: { user: { trip: { id, title, subtitle, startDate, endDate } } } } = this.props;

    this.props.updateMutation({
      variables: {
        id: id,
        title: newParams.title || title,
        subtitle: newParams.subtitle || subtitle,
        startDate: newParams.startDate || startDate,
        endDate: newParams.endDate || endDate
      },
    })
  }

  render () {
    const { data: { loading, error, user }} = this.props;
    if (loading) { return (<div>Loading</div>) }
    if (error)   { return (<div>ERROR: {error}</div>) }
    const { id, title, subtitle, header, startDate, endDate } = user.trip;

    return (
      <div>
        <EditHeader>
          <ul className="UserActions">
            <Link to={`/${user.username}/${id}`} className="Button small">Finish editing</Link>
            <Link to={`/${user.username}/${id}/delete`} className="Button small destructive">Delete trip</Link>
          </ul>
        </EditHeader>

        <div className="Container full header EditTrip">
          <EditTripHeader
            title={title}
            subtitle={subtitle}
            header={header}
            startDate={startDate}
            endDate={endDate}
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
