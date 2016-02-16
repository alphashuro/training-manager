const {describe, it} = global;
import {spy, stub} from 'sinon';
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
    it('correctly maps context', () => {
      const context = {Meteor: {}};
      const actions = {auth: {signup: spy(), clearSignupErrors: spy()}};

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('correctly maps signup', () => {
      const context = {};
      const actions = {auth: {signup: spy(), clearSignupErrors: spy()}};

      const props = depsMapper(context, actions);
      props.signup();

      expect(actions.auth.signup.calledOnce).to.be.equal(true);
    });
    it('correctly maps clearSignupErrors', () => {
      const context = {};
      const actions = {auth: {signup: spy(), clearSignupErrors: spy()}};

      const props = depsMapper(context, actions);
      props.clearErrors();

      expect(actions.auth.clearSignupErrors.calledOnce).to.be.equal(true);
    });
  });
});
