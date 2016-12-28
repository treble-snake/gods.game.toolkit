import React from 'react';
import { shallow } from 'enzyme';
import InputBar from 'components//InputBar.js';

describe('<InputBar />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<InputBar />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "inputbar-component"', () => {
      expect(component.hasClass('inputbar-component')).to.equal(true);
    });
  });
});
