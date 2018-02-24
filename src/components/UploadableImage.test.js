import React from 'react'
import { shallow } from 'enzyme'
import UploadableImage from './UploadableImage'

describe("UploadableImage", () => {
  const file = new Blob(["moo"], {type : 'image/jpg'})
  const otherFile = new Blob(["baa"], { type: 'image/jpg' })

  // Mock file reader
  const readAsDataURL = jest.fn()
  const dummyFileReader = { readAsDataURL, result: "result.jpg" }
  window.FileReader = jest.fn(() => dummyFileReader)

  // Mock image
  const dummyImage = { src: null, onLoad: null }
  window.Image = jest.fn(() => dummyImage)

  // Mock XHR
  const xhrOpen = jest.fn()
  const xhrSend = jest.fn()
  const xhrAbort = jest.fn()
  const xhrEventListener = jest.fn()
  const xhrSetRequestHeader = jest.fn()
  const dummyXHR = {
    open: xhrOpen,
    setRequestHeader: xhrSetRequestHeader,
    upload: { addEventListener: xhrEventListener },
    onerror: null,
    onload: null,
    send: xhrSend,
    abort: xhrAbort
  }
  window.XMLHttpRequest = jest.fn(() => dummyXHR)

  describe("Without a source", () => {
    it("Does not render an image", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      wrapper.setState({src: null})

      expect(wrapper.contains("img")).toBe(false)
    })
  })

  describe("With error", () => {
    it("Renders an error message", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      wrapper.setState({error: "Error"})
      expect(wrapper.find(".uploadError").length).toBe(1)
    })
  })

  describe("With progress", () => {
    it("Renders a progress bar", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      wrapper.setState({percentComplete: 10})

      let progress = wrapper.find('.progress')
      expect(progress.prop("style")).toEqual({width: "10%"})
    })
  })

  describe("componentWillUnmount", () =>{
    it("Removes the image reference", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const img = { onLoad: null }
      const instance = wrapper.instance()
      instance.img = img
      expect(instance.img).toBeDefined()

      instance.componentWillUnmount.call(instance)
      expect(instance.img).toBeUndefined()
    })

    it("Removes the xhr reference and aborts the request", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const xhrAbort = jest.fn()
      const xhr = { abort: xhrAbort }
      const instance = wrapper.instance()
      instance.xhr = xhr
      expect(instance.xhr).toBeDefined()

      instance.componentWillUnmount.call(instance)
      expect(xhrAbort).toBeCalled()
      expect(instance.xhr).toBeUndefined()
    })
  })

  describe("componentWillReceiveProps", () => {
    it("Returns when file is the same", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const spy = jest.fn()
      const instance = wrapper.instance()
      instance.setPreview = spy

      instance.componentWillReceiveProps.call(instance, {file: file} )
      expect(spy).not.toBeCalled

      instance.componentWillReceiveProps.call(instance, { file: otherFile })
      expect(spy).toBeCalled
    })

    it("Aborts the XHR request", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const xhrAbort = jest.fn()
      const xhr = { abort: xhrAbort }
      const instance = wrapper.instance()
      instance.xhr = xhr

      instance.componentWillReceiveProps.call(instance, { file: otherFile })
      expect(xhrAbort).toBeCalled()
      expect(instance.xhr).toBeUndefined()
    })
  })

  describe("setPreview", () => {
    it("Loads a FileReader and reads the data", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )

      wrapper.instance().setPreview.call(wrapper.instance(), {file: file})
      expect(readAsDataURL).toBeCalledWith(file)
    })

    it("Sets the proper state after onload callback", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const uploadFile = jest.fn()
      const props = { file: file }
      const instance = wrapper.instance()
      instance.uploadFile = uploadFile

      instance.setPreview.call(wrapper.instance(), props)
      dummyFileReader.onload.call({})

      expect(instance.state.src).toEqual("result.jpg")
      expect(instance.state.progress).toBe(1)
      expect(uploadFile).toBeCalledWith(props)
    })
  })

  describe("handlePreviewImageLoad", () => {
    it("Sets the ratio", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const event = { target: { offsetWidth: 100, offsetHeight: 50 } }
      const instance = wrapper.instance()
      instance.handlePreviewImageLoad.call(instance, event)
      expect(instance.state.ratio).toBe(2)
    })
  })

  describe("handleUploadError", () => {
    it("Sets an error state", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const error = { }
      const instance = wrapper.instance()

      expect(instance.state.error).toBeNull()
      instance.handleUploadError.call(instance, error)
      expect(instance.state.error).toBe(error)
    })
  })

  describe("handleUploadComplete", () => {
    it("Sets a photo state and calls setPreview", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const spy = jest.fn()
      const photo = { id: 10, width: 200, height: 100, ratio: 10, url: "foo.jpg" }
      const event = { target: { response: JSON.stringify(photo) } }
      const instance = wrapper.instance()
      instance.previewImage = { offsetWidth: 100, offsetHeight: 50 }
      instance.loadFullImage = spy

      instance.handleUploadComplete.call(instance, event)
      expect(instance.state.photo).toEqual(photo)
      expect(spy).toBeCalledWith("foo.jpg?w=100&h=50")
    })
  })

  describe("handleLoadFullImage", () => {
    it("Sets new state and removes references to previous img and xhr", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const spy = jest.fn()
      const src = "foo.jpg?w=100&h=50"
      const instance = wrapper.instance()
      instance.xhr = dummyXHR
      instance.img = dummyImage

      expect(instance.xhr).toBeDefined()
      expect(instance.img).toBeDefined()

      instance.handleLoadFullImage.call(instance, { target: { src: src } })
      expect(instance.state.src).toEqual(src)
      expect(instance.state.percentComplete).toEqual(-1)
      expect(instance.xhr).toBeUndefined()
      expect(instance.img).toBeUndefined()
    })

    it("Calls onComplete callback", () => {
      const spy = jest.fn()
      const wrapper = shallow(
        <UploadableImage
          file={file}
          onComplete={spy} />
      )
      const photo = {}
      const src = "foo.jpg?w=100&h=50"
      const instance = wrapper.instance()
      wrapper.setState({ photo: photo })

      instance.handleLoadFullImage.call(instance, { target: { src: src } })

      expect(spy).toBeCalledWith({
        photo: photo,
        preRenderedUrl: src
      })
    })
  })

  describe("loadFullImage", () => {
    it("Sets the image instance var and the callback", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const spy = jest.fn()
      const src = "foo.jpg?w=100&h=50"
      const instance = wrapper.instance()

      instance.loadFullImage.call(instance, src)
      expect(instance.img).toBeDefined()
      expect(dummyImage.onload).toEqual(instance.handleLoadFullImage)
    })
  })

  describe("getFormData", () => {
    it("Returns formatted form data", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const parentType = "Post"
      const parentId = "1"
      const instance = wrapper.instance()

      let result = instance.getFormData.call(instance, { parentType: parentType, parentId: parentId, file: file })
      expect(result.get("parentType")).toEqual(parentType)
      expect(result.get("parentId")).toEqual(parentId)
      expect(result.get("image")).toEqual(file)
    })
  })

  describe("uploadFile", () => {
    beforeAll(() => {
      localStorage.setItem("authenticationToken", "fooToken")
    })
    afterAll(() => {
      localStorage.delete("authenticationToken")
    })

    it("Sets all the right callbacks and uploads a file", () => {
      const wrapper = shallow(
        <UploadableImage
          file={file} />
      )
      const props = { parentType: "Post", parentId: "1", file: file }
      const instance = wrapper.instance()
      instance.getFormData = (data) => ("form data")
      instance.uploadFile.call(instance, props)

      expect(xhrOpen).toBeCalledWith("POST", "undefined/photos", true)
      expect(xhrSetRequestHeader).toBeCalledWith("authorization", "Bearer fooToken")
      expect(xhrEventListener).toBeCalledWith("progress", instance.handleUploadProgress, false)
      expect(dummyXHR.onerror).toEqual(instance.handleUploadError)
      expect(dummyXHR.onload).toEqual(instance.handleUploadComplete)
      expect(instance.xhr).toEqual(dummyXHR)
      expect(dummyXHR.send).toBeCalledWith("form data")
    })
  })

})
