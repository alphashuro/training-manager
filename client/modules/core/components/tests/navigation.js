const {describe, it} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import {shallow, render} from 'enzyme';
import Nav from '../navigation.jsx';
import React from 'react';

describe('core.components.navigation', () => {
  const getProps = () => ({
    handleLogout: spy(),
    email: 'name@email.com',
    path: '/'
  });
  it(`should contain a link to
  home, clients, courses,
  facilitators and bookings`, () => {
    const props = getProps();

    const el = shallow(<Nav {...props}/>);
    expect(el.contains({href: '/'})).to.be.equal(true);
    expect(el.contains({href: '/clients'})).to.be.equal(true);
    expect(el.contains({href: '/courses'})).to.be.equal(true);
    expect(el.contains({href: '/facilitators'})).to.be.equal(true);
    expect(el.contains({href: '/bookings'})).to.be.equal(true);
  });
    it('should render a nav with activekey that matches current path', () => {
      const props = getProps();
      props.path = '/courses';

      const el = shallow(<Nav {...props}/>);
      const nav = el.find('Nav.navigation');

      expect(nav.prop('activeKey')).to.be.equal(2);
  });
    it('should render the email', () => {
      const props = getProps();

      const el = render(<Nav {...props}/>);
      expect(el.text()).to.contain(props.email);
  });
    it('should call handleLogout when .logout is clicked', () => {
      const props = getProps();

      const el = shallow(<Nav {...props}/>);
      el.find('.logout').simulate('click');
      expect(props.handleLogout.calledOnce).to.be.equal(true);
  });
});
