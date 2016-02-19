const {describe, it} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import Nav from '../navigation.jsx';
import React from 'react';

describe('core.components.navigation', () => {
  it('should render current user org', () => {
    const props = {
      onLogout: spy(),
      user: {
        emails: [
          { address: 'e-1' }
        ],
        profile: {
          org: 'o-1'
        }
      },
      path: '/courses'
    };

    const el = shallow(<Nav {...props}/>);

    expect(el.find({children: props.user.profile.org}).length)
    .to.be.equal(1);
  });
  it('should render a nav with activekey that matches current path', () => {
    const props = {
      onLogout: spy(),
      user: {
        emails: [
          { address: 'e-1' }
        ],
        profile: {
          org: 'o-1'
        }
      },
      path: '/courses'
    };

    const el = shallow(<Nav {...props}/>);
    expect(el.find({activeKey: 2}).length).to.be.equal(1);
  });
  it('should render the current user\'s email', () => {
    const props = {
      onLogout: spy(),
      user: {
        emails: [
          { address: 'e-1' }
        ],
        profile: {
          org: 'o-1'
        }
      },
      path: '/courses'
    };

    const el = shallow(<Nav {...props}/>);
    expect(el.find({title: 'e-1'}).length).to.be.equal(1);
  });
  it('should call onLogout when .logout is clicked', () => {
    const props = {
      onLogout: spy(),
      user: {
        emails: [
          { address: 'e-1' }
        ],
        profile: {
          org: 'o-1'
        }
      },
      path: '/courses'
    };

    const el = shallow(<Nav {...props}/>);
    el.find('.logout').simulate('click');
    expect(props.onLogout.calledOnce).to.be.equal(true);
  });
});
