import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { graphql } from 'react-apollo'
import ScaledImage from '../../../ScaledImage'
import CreatePhotoRowItemQuery from '../../../../graphql/CreatePhotoRowItemQuery.gql'
import UploadableImage from '../../../UploadableImage'

import './PhotoRow.css'

export class PostEditPhotoRow extends React.Component {
  constructor(props) {
    super()

    this.state = {
      items: (props.items || []).map(e => e)
    }
  }

  static propTypes = {
    id:    PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  }

  onDrop = (files) => {
    // verify limits (file/size/count)
    for (let file of files) {
      this.createPhoto(file)
    }
  }

  createPhoto = (photo) => {
    // Create mutation for each file
    this.props.mutate({
      variables: {sectionId: this.props.id},
    }).then(({data: {createPhotoRowSectionItem:item}}) => {
      // After the mutation, render upload files
      item.file = photo
      var items = this.state.items
      items.push(item)
      this.setState({items: items})
    })
  }

  render () {
    let className = "PhotoRow Container edit"
    let empty = true
    let items = this.state.items.map((item) => {
      let component =  <div>Moo</div>
      if (item.file) {
        empty = false
        component =  (
          <UploadableImage
            key={item.id}
            parentType="PhotoRowSectionItem"
            parentId={item.id}
            file={item.file} />
        )
      } else if (item.photo && item.photo.id) {
        empty = false
        component =  (
          <ScaledImage
          key={item.id}
          image={item.photo}
          style={{flex: item.photo.ratio}}
          alt="image"/>
        )
      }
      return component
    });

    if(empty) {
      className = "PhotoRow Container edit empty"
    }
    return (
      <div className={className}>
        <Dropzone onDrop={this.onDrop} className="Dropzone">
          {items}
        </Dropzone>
      </div>
    )
  }
}

export default graphql(CreatePhotoRowItemQuery)(PostEditPhotoRow);
