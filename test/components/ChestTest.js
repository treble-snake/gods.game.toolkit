import React from 'react';
import { shallow } from 'enzyme';
import Chest from 'components//Chest.js';

describe('<Chest />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Chest />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "chest-component"', () => {
      expect(component.hasClass('chest-component')).to.equal(true);
    });
  });
});
