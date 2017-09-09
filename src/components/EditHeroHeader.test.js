import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json';

import EditHeroHeader from './EditHeroHeader'

describe("EditHeroHeader", () => {
  const photo = {id: "def234", ratio: 1, url: "image.jpg"}
  const file = {}
  const spy = jest.fn()

  describe("With photo", () => {
    it("Renders a scaled image", () => {
      const wrapper = shallow(
        <EditHeroHeader
          title="Header title"
          subtitle="Header subtitle"
          uploadParentId="trip1"
          uploadParentType="Trip"
          header={photo}
          onChange={spy} />
      )

      let scaledImage = wrapper.find("ScaledImage")
      expect(scaledImage.prop("image")).toEqual(photo)
      expect(scaledImage.prop("style")).toEqual({flex: 1})
    })
  })

  describe("With file", () => {
    it("Renders an UploadableImage", () => {
      const wrapper = shallow(
        <EditHeroHeader
          title="Header title"
          subtitle="Header subtitle"
          uploadParentId="trip1"
          uploadParentType="Trip"
          header={photo}
          onChange={spy} />
      )
      wrapper.setState({file: file})

      let uploadableImage = wrapper.find("UploadableImage")
      expect(uploadableImage.prop("parentId")).toEqual("trip1")
      expect(uploadableImage.prop("parentType")).toEqual("Trip")
      expect(uploadableImage.prop("file")).toEqual(file)
    })
  })

  it("Uploads an image when file is dropped", () => {
    const wrapper = shallow(
      <EditHeroHeader
        title="Header title"
        subtitle="Header subtitle"
        uploadParentId="trip1"
        uploadParentType="Trip"
        header={photo}
        onChange={spy} />
    )
    wrapper.instance().onDrop.call(wrapper.instance(), [file])

    expect(wrapper.instance().state.file).toEqual(file)
  })

  it("Calls onChange when input is blurred", () => {
    const wrapper = shallow(
      <EditHeroHeader
        title="Header title"
        subtitle="Header subtitle"
        uploadParentId="trip1"
        uploadParentType="Trip"
        header={photo}
        onChange={spy} />
    )

    // Title input
    wrapper.find("input").at(0).simulate("blur", {})
    expect(spy).toBeCalledWith({title: "Header title", subtitle: "Header subtitle"})

    wrapper.setState({title: "New title", subtitle: "New subtitle"})

    // Subtitle input
    wrapper.find("input").at(1).simulate("blur", {})
    expect(spy).toBeCalledWith({title: "New title", subtitle: "New subtitle"})
  })

  it("Updates state from new props", () => {
    const wrapper = shallow(
      <EditHeroHeader
        title="Header title"
        subtitle="Header subtitle"
        uploadParentId="trip1"
        uploadParentType="Trip"
        header={photo}
        onChange={spy} />
    )

    wrapper.instance().componentWillReceiveProps.call(wrapper.instance(), {
      title: "New title",
      subtitle: "New subtitle",
      header: photo
    })

    expect(wrapper.instance().state).toEqual({
      title: "New title",
      subtitle: "New subtitle",
      header: photo,
      file: null
    })
  })

  it ("Matches snapshot",() => {
    const wrapper = shallow(
      <EditHeroHeader
        title="Header title"
        subtitle="Header subtitle"
        uploadParentId="trip1"
        uploadParentType="Trip"
        header={photo}
        onChange={spy} />
    )

    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
