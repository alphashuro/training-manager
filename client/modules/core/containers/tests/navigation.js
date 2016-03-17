const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy, assert} from 'sinon';
import {composer, depsMapper} from '../navigation';

describe('core.containers.navitation', () => {
	describe('composer', () => {
    const mockUser = {
      email: () => '',
      org: () => ''
    };
    const mockCurrent = {
      path: ''
    };
    const getContext = ({user, current} = {
      user: stub().returns(mockUser),
      current: stub().returns({path:'/'})
    }) => () => ({
      Meteor: {user},
      FlowRouter: {current}
    });

  	it('should get the current user', () => {
      const context = getContext();
    	const onData = spy();

    	composer({context}, onData);

    	assert.calledOnce(context().Meteor.user);
    });

  	it('should get the current path', () => {
      const context = getContext();
    	const onData = spy();

    	composer({context}, onData);

      assert.calledOnce(context().FlowRouter.current);
    });

    it(`should pass the email and org on to onData`, () => {
      const user = stub().returns({
        email: () => 'name@email.com',
        org: () => 'org'
      });

      const context = getContext({user, current: () => ({path: ''})});
      const onData = spy();

      composer({context}, onData);

      assert.calledWithExactly(onData, null, {email: 'name@email.com', org: 'org', path: ''});
    });

    it(`should still pass the path on to onData if user has not loaded`, () => {
      const current = stub().returns({
        path: '/path'
      });

      const context = getContext({current, user: () => null});
      const onData = spy();

      composer({context}, onData);

      assert.calledWithExactly(onData, null, {path: '/path'});
    });
  });
	describe('depsMapper', () => {
  	it('should map context to a function', () => {
    	const context = {Meteor: {}};
    	const actions = {
      	auth: {
        	logout: spy()
        }
      };

    	const props = depsMapper(context, actions);
    	expect(props.context()).to.deep.equal(context);
    });
  	it('should map actions.auth.logout to handleLogout', () => {
    	const context = {};
    	const actions = { auth: { logout: spy() } };

    	const props = depsMapper(context, actions);
    	props.handleLogout();
    	expect(actions.auth.logout.calledOnce).to.be.equal(true);
    });
  });
});
