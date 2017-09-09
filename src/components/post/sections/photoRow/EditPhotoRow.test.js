import React from 'react'
import { shallow } from 'enzyme'
import { PostEditPhotoRow } from './EditPhotoRow'

describe("EditHero", () => {
  const photo = {id: "photo1", ratio: 1, url: "image.jpg"}
  const item = {id: "item1", photo: photo}
  const file = {}

  describe("With photo", () => {
    it("Renders a scaled image", () => {
      const wrapper = shallow(
        <PostEditPhotoRow
          id="abc123"
          items={[item]} />
      )

      let scaledImage = wrapper.find("ScaledImage")
      expect(scaledImage.prop("image")).toEqual(photo)
      expect(scaledImage.prop("style")).toEqual({flex: 1})
    })
  })

  describe("With file", () => {
    const newItem = {id: "item2", file: file}
    it("Renders an UploadableImage", () => {
      const wrapper = shallow(
        <PostEditPhotoRow
          id="abc123"
          items={[item]} />
      )
      wrapper.setState({items: [newItem]})

      let uploadableImage = wrapper.find("UploadableImage")
      expect(uploadableImage.prop("parentId")).toEqual("item2")
      expect(uploadableImage.prop("parentType")).toEqual("PhotoRowSectionItem")
      expect(uploadableImage.prop("file")).toEqual(file)
    })
  })

  it("Uploads an image when file is dropped", () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <PostEditPhotoRow
          id="abc123"
          items={[item]} />
    )

    wrapper.instance().createPhoto = spy

    wrapper.instance().onDrop.call(wrapper.instance(), [file])
    expect(spy).toBeCalledWith(file)
  })
})
