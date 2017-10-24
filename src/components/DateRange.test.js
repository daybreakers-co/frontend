import React from 'react'
import { shallow } from 'enzyme'
import DateRange from './DateRange'

describe("DateRange", () => {

  it("Only renders one date if start and end are the same", () => {
    const wrapper = shallow(
      <DateRange
        startDate="10-10-2010"
        endDate="10-10-2010" />
    )

    expect(wrapper.text()).toEqual("10-10-2010")
  })

  it("Only renders both dates if they are different", () => {
    const wrapper = shallow(
      <DateRange
        startDate="10-10-2010"
        endDate="11-10-2010" />
    )

    expect(wrapper.text()).toEqual("10-10-2010 — 11-10-2010")
  })

  it("Renders separator if given", () => {
    const wrapper = shallow(
      <DateRange
        startDate="10-10-2010"
        endDate="11-10-2010"
        separator="::" />
    )

    expect(wrapper.text()).toEqual("10-10-2010 :: 11-10-2010")
  })
})
