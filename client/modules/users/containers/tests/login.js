const {describe, it} = global;
import {spy, stub} from 'sinon';
import {expect} from 'chai';
import {composer, depsMapper} from '../login';

describe('users.containers.login', () => {
  describe('composer', () => {
    it('gets error from LOGIN_ERROR LocalState', () => {
      const LocalState = {get: spy()};
      const context = () => ({LocalState});
      composer({context}, spy());

      expect(LocalState.get.calledOnce).to.be.equal(true);
      expect(LocalState.get.args[0][0]).to.be.equal('LOGIN_ERROR');
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
      const actions = {auth: {login: spy(), clearLoginErrors: spy()}};

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('correctly maps login', () => {
      const context = {};
      const actions = {auth: {login: spy(), clearLoginErrors: spy()}};

      const props = depsMapper(context, actions);
      props.login();

      expect(actions.auth.login.calledOnce).to.be.equal(true);
    });
    it('correctly maps clearLoginErrors', () => {
      const context = {};
      const actions = {auth: {login: spy(), clearLoginErrors: spy()}};

      const props = depsMapper(context, actions);
      props.clearErrors();

      expect(actions.auth.clearLoginErrors.calledOnce).to.be.equal(true);
    });
  });
});
