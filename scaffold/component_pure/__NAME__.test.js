import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import __NAME__ from './__NAME__.jsx';

describe('snapshot tests', () => {
  it('renders', () => {
    const tree = renderer.create(
      <__NAME__ />
    ).toJSON();

    //expect(tree).toMatchSnapshot();
    expect(true).toBe(false);
  });
});

describe('functional tests', () => {
  it('has the correct text', () => {
    const text = 'TwentyThree';
    const root = shallow(
      <__NAME__ />
    );

    expect(root.text()).toBe(text);
  });
});

describe('behavioural tests', () => {
  it('should call onClick when clicked', () => {
    const mock = jest.fn();
    const root = shallow(
      <__NAME__ />
    );

    root.simulate('click');

    expect(mock).toBeCalled();
  });
});