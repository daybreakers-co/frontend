import React from 'react';
import { shallow } from 'enzyme';
import ShowText from './ShowText';

it('renders a header and body', () => {
  const textSection = {title: "Wohoo", body: "Moo", index: 1, id: 'abc'}
  const wrapper = shallow(<ShowText textSection={textSection} />);

  expect(wrapper.find('h2').text()).toEqual("Wohoo")
  expect(wrapper.find('div').at(1).text()).toEqual("Moo")
});
