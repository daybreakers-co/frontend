import React from 'react'
import { shallow } from 'enzyme'
import ScaledImage from './ScaledImage'

describe("ScaledImage", () => {
  const image = {id: "def234", ratio: 1, url: "image.jpg"}

  describe("Without image", () => {
    it("Does not render an image", () => {
      const wrapper = shallow(
        <ScaledImage
          alt="Alt text"
          image={null} />
      )

      expect(wrapper.find("img").exists()).toBe(false)
    })
  })

  describe("With an image", () => {
    const wrapper = shallow(
      <ScaledImage
        alt="Alt text"
        image={image} />
    )
    wrapper.setState({loaded: true})

    it("Renders an image", () => {
      let img = wrapper.find("img")
      expect(img.prop("src")).toEqual("image.jpg?w=360")
      expect(img.prop("alt")).toEqual("Alt text")
      expect(img.prop("srcSet")).toContain("image.jpg?w=360 360w")
      expect(img.prop("onLoad")).toEqual(wrapper.instance().handleLoadFullImage)
      expect(img.prop("sizes")).toEqual("360px")
    })
  })

  describe("handleFullImageLoaded", () => {
    it("It updates the state after the image is loaded", () => {
      const wrapper = shallow(
        <ScaledImage
          alt="Alt text"
          image={image} />
      )
      wrapper.instance().previewImage = {offsetWidth: 500}
      wrapper.instance().handleLoadFullImage.call(wrapper.instance())

      expect(wrapper.instance().state).toEqual({width: 500})
    })
  })

  describe("cover image", () => {
    it("It updates the state after the image is loaded", () => {
      const wrapper = shallow(
        <ScaledImage
          alt="Alt text"
          image={image}
          cover />
      )

      expect(wrapper.prop("className")).toEqual("ScaledImage cover")
    })
  })
})
