const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {composer, depsMapper} from '../enroll';

describe(`users.containers.enroll`, () => {
  describe(`composer`, () => {
    const getContext = (user) => {
      const LocalState = { get: spy() };
      const Meteor = { subscribe: () => ({ ready: () => false }) };
      const Collections = {
        Users: {
          findOne: () => user || { profile: { name: 'name' } }
        }
      };
      return { LocalState, Meteor, Collections };
    };
    it(`should get error from ENROLL_ERROR LocalState`, () => {
      const context = getContext();
      composer({context: () => context}, spy());

      assert.calledOnce(context.LocalState.get);
      assert.calledWithExactly(context.LocalState.get, 'ENROLL_ERROR');
    });
    describe(`if there is error`, () => {
      it(`should call onData with the error`, () => {
        const context = getContext();
        context.LocalState.get = stub().returns('error');
        const onData = spy();
        composer({context: () => context}, onData);

        assert.calledOnce(onData);
        const args = onData.args[0];
        expect(args[0]).to.be.equal(null);
        expect(args[1].error).to.be.equal('error');
      });
    });
    it(`should subscribe to users.invited with the token`, () => {
      const context = getContext();
      context.Meteor.subscribe = stub().returns({ready: () => false});
      composer({context: () => context, token: 'token'}, spy());

      assert.calledOnce(context.Meteor.subscribe);
      assert.calledWithExactly(context.Meteor.subscribe, 'users.invited', 'token');
    });
    describe(`if subscription is ready`, () => {
      it(`should pass the token to onData`, () => {
        const context = getContext();
        context.Meteor.subscribe = stub().returns({ ready: () => true });
        const onData = spy();
        composer({context: () => context, token: 'token'}, onData);

        const args = onData.args[0];
        expect(args[0]).to.be.equal(null);
        expect(args[1].token).to.be.equal('token');
      });
      it(`should pass the invited user's username to onData`, () => {
        const user = {
          profile: {
            name: 'user'
          }
        };
        const context = getContext(user);
        context.Meteor.subscribe = stub().returns({ ready: () => true });
        const onData = spy();
        composer({context: () => context, token: 'token'}, onData);

        const args = onData.args[0];
        expect(args[0]).to.be.equal(null);
        expect(args[1].username).to.be.equal(user.profile.name);
      });
    });
  });
  describe(`depsMapper`, () => {
    const getActions = () => ({
      users: {
        setPassword: spy()
      }
    });
    it(`should map context to a function`, () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it(`should map handleSubmit to call users.setPassword with the event target's password and confirmation and the token`, () => {
      const context = {};
      const actions = getActions();

      const props = depsMapper(context, actions);
      const event = {
        preventDefault: spy(),
        target: {
          password: {
            value: 'password'
          },
          confirm: {
            value: 'password'
          }
        }
      };
      props.handleSubmit('token', event);

      assert.calledWithExactly(actions.users.setPassword, 'token', 'password', 'password');
    });
  });
});
