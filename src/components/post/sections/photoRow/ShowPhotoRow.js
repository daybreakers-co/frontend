import React from 'react'
import { propType } from 'graphql-anywhere';

import ScaledImage from '../../../ScaledImage'
import ShowPhotoRowFragment from '../../../../graphql/_ShowPhotoRow.gql'

import './PhotoRow.css'

const ShowPhotoRow = ({ photoRowSection: { id, index, photos }}) => (
  <div className="Container">
    <div className="columns">
      {photos.map((photo) =>
        <ScaledImage
          key={photo.id}
          image={photo}
          style={{flex: photo.ratio}}
          alt="image"/>
      )}
    </div>
  </div>
)

ShowPhotoRow.propTypes = {
  photoRowSection: propType(ShowPhotoRowFragment).isRequired,
}

export default ShowPhotoRow;
