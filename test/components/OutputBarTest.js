import React from 'react';
import { shallow } from 'enzyme';
import OutputBar from 'components//OutputBar.js';

describe('<OutputBar />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<OutputBar />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "outputbar-component"', () => {
      expect(component.hasClass('outputbar-component')).to.equal(true);
    });
  });
});
