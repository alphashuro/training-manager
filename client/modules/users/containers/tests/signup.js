const {describe, it} = global;
import {spy, stub, assert} from 'sinon';
import {expect} from 'chai';
import {composer, depsMapper} from '../signup';

describe('users.containers.signup', () => {
  describe('composer', () => {
    it('gets error from SIGNUP_ERROR LocalState', () => {
      const LocalState = {get: spy()};
      const context = () => ({LocalState});
      composer({context}, spy());

      expect(LocalState.get.calledOnce).to.be.equal(true);
      expect(LocalState.get.args[0][0]).to.be.equal('SIGNUP_ERROR');
    });
    describe('if there is error', () => {
      it('calls onData with error', () => {
        const LocalState = {get: stub()};
        const error = 'oops';
        LocalState.get.returns(error);
        const context = () => ({LocalState});
        const onData = spy();

        composer({context}, onData);

        expect(onData.calledOnce).to.be.equal(true);
        expect(onData.args[0]).to.deep.equal([ null, { error } ]);
      });
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      auth: {
        signup: spy(),
        clearSignupErrors: spy(),
      }
    });
    it('correctly maps context', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it(`handleSignup calls auth.signup with event target's email and password`, () => {
      const context = {};
      const actions = getActions();

      const props = depsMapper(context, actions);
      const event = {
        preventDefault: spy(),
        target: {
          email: {value: 'email'},
          password: {value: 'password'},
        }
      };
      props.handleSignup(event);

      assert.calledWithExactly(actions.auth.signup, 'email', 'password');
    });
    it('correctly maps clearSignupErrors', () => {
      const context = {};
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.clearErrors();

      expect(actions.auth.clearSignupErrors.calledOnce).to.be.equal(true);
    });
  });
});
