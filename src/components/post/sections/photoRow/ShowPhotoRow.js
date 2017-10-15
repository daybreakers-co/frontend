import React from 'react'
import { propType } from 'graphql-anywhere';

import ScaledImage from '../../../ScaledImage'
import ShowPhotoRowFragment from '../../../../graphql/_ShowPhotoRow.gql'

import './PhotoRow.css'

const ShowPhotoRow = ({ photoRowSection: { id, index, items }}) => (
  <div className="PhotoRow Container">
    {items.map((item) =>
      <ScaledImage
        key={item.photo.id}
        image={item.photo}
        style={{flex: item.photo.ratio}}
        alt="image"/>
    )}
  </div>
)

ShowPhotoRow.propTypes = {
  photoRowSection: propType(ShowPhotoRowFragment).isRequired,
}

export default ShowPhotoRow;
