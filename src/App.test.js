import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

it('renders Sign in / Sign up link when logged out', () => {
  const wrapper = shallow(<App data={{viewer: null}} />);

  expect(wrapper.find('Link').at(0).prop("to")).toEqual("/signin")
  expect(wrapper.find('Link').at(1).prop("to")).toEqual("/signup")
});

it('renders sign out when logged in', () => {
  const wrapper = shallow(<App data={{viewer: {}}} />);

  expect(wrapper.find('nav').text()).toContain("Sign out")
});

it('removes the authentication token from storage on logout', () => {
  localStorage.setItem('authentiationToken', 'foo')
  const wrapper = shallow(<App data={{viewer: {}}} />);

  expect(localStorage.getItem('authenticationToken')).toBeDefined

  wrapper.find('a').simulate('click')

  expect(localStorage.getItem('authenticationToken')).toBeUndefined
});
