import React from 'react'
import { shallow } from 'enzyme'
import ScaledImage from './ScaledImage'

describe("ScaledImage", () => {
  const image = {id: "def234", ratio: 1, url: "image.jpg"}

  describe("Without image", () => {
    it("Renders a scaled image", () => {
      const wrapper = shallow(
        <ScaledImage
          alt="Alt text"
          image={null} />
      )

      let img = wrapper.find("img")
      expect(img.prop("src")).toBe(null)
      expect(img.prop("alt")).toEqual("Alt text")
      expect(img.prop("onLoad")).toEqual(wrapper.instance().handleLoadFullImage)
    })
  })

  describe("When loading", () => {
    const wrapper = shallow(
      <ScaledImage
        alt="Alt text"
        image={image} />
    )

    it("Renders an image", () => {
      let img = wrapper.find("img")
      expect(img.prop("src")).toEqual("image.jpg?width=40")
      expect(img.prop("alt")).toEqual("Alt text")
      expect(img.prop("onLoad")).toEqual(wrapper.instance().handleLoadFullImage)
    })

    it("Renders a loading indicator", () => {
      let indictor = wrapper.find("i")
      expect(indictor.prop("className")).toEqual("fa fa-circle-o-notch")
    })
  })

  describe("When loaded", () => {
    const wrapper = shallow(
      <ScaledImage
        alt="Alt text"
        image={image} />
    )
    wrapper.setState({loaded: true})

    it("Renders an image", () => {
      let img = wrapper.find("img")
      expect(img.prop("src")).toEqual("image.jpg?width=40")
      expect(img.prop("alt")).toEqual("Alt text")
      expect(img.prop("onLoad")).toEqual(wrapper.instance().handleLoadFullImage)
    })

    it("Does not render a loading indicator", () => {
      expect(wrapper.contains("i")).toBe(false)
    })
  })

  describe("handleFullImageLoaded", () => {
    it("It updates the state after the image is loaded", () => {
      const wrapper = shallow(
        <ScaledImage
          alt="Alt text"
          image={image} />
      )
      const event = {target: {src: "image.jpg?width=1000"}}
      wrapper.instance().handleFullImageLoaded.call(wrapper.instance(), event)


      expect(wrapper.instance().state).toEqual({
        loaded: true,
        src: "image.jpg?width=1000"
      })
    })
  })
})
