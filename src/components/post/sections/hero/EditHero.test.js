import React from 'react'
import { shallow } from 'enzyme'
import EditHero from './EditHero'

describe("EditHero", () => {
  const photo = {id: "def234", ratio: 1, url: "image.jpg"}
  const file = {}

  describe("With photo", () => {
    it("Renders a scaled image", () => {
      const wrapper = shallow(
        <EditHero
          id="abc123"
          index={1}
          photo={photo} />
      )

      let scaledImage = wrapper.find("ScaledImage")
      expect(scaledImage.prop("image")).toEqual(photo)
      expect(scaledImage.prop("style")).toEqual({flex: 1})
    })
  })

  describe("With file", () => {
    it("Renders an UploadableImage", () => {
      const wrapper = shallow(
        <EditHero
          id="abc123"
          index={1}
          photo={photo} />
      )
      wrapper.setState({file: file})

      let uploadableImage = wrapper.find("UploadableImage")
      expect(uploadableImage.prop("parentId")).toEqual("abc123")
      expect(uploadableImage.prop("parentType")).toEqual("HeroSection")
      expect(uploadableImage.prop("file")).toEqual(file)
    })
  })

  it("Uploads an image when file is dropped", () => {
    const wrapper = shallow(
      <EditHero
        id="abc123"
        index={1}
        photo={photo} />
    )

    wrapper.instance().onDrop.call(wrapper.instance(), [file])

    expect(wrapper.instance().state.file).toEqual(file)
  })
})
