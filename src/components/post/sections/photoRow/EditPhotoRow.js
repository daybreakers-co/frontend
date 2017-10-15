import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import './PhotoRow.css'
import { graphql } from 'react-apollo'
import ScaledImage from '../../../ScaledImage'
import CreatePhotoRowItemQuery from '../../../../graphql/CreatePhotoRowItemQuery.gql'
import UploadableImage from '../../../UploadableImage'

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
    let items = this.state.items.map((item) => {
      let component =  <div>Moo</div>
      if (item.file) {
        component =  (
          <UploadableImage
            key={item.id}
            parentType="PhotoRowSectionItem"
            parentId={item.id}
            file={item.file} />
        )
      } else if (item.photo && item.photo.id) {
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
    return (
      <Dropzone onDrop={this.onDrop} className="dropzone">
        <p className="PhotoRowDropHint"><i className="fa fa-picture-o" /> Drop images here or click to create a row of photos.</p>
        <div className="PhotoRow Container edit">{items}</div>
      </Dropzone>
    )
  }
}

export default graphql(CreatePhotoRowItemQuery)(PostEditPhotoRow);
