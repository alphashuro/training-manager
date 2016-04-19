const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {composer, depsMapper} from '../user.js';

describe('users.containers.user', () => {
  describe('composer', () => {
    const getUser = () => ({
      _id: 'id',
      email: () => 'email',
      profile: {
        name: 'name',
        phone: 'phone',
      },
      name() { return this.profile.name },
      phone() { return this.profile.phone }
    });
    const getContext = () => ({
      Meteor: { subscribe: stub().returns({ ready: () => false })},
      Collections: { Users: { findOne: stub() } },
      LocalState: { get: stub() }
    });
    it('should subscribe to users.single with given userId', () => {
      const context = getContext();
      composer({context: () => context, userId: 'id'});

      assert.calledOnce(context.Meteor.subscribe);
      assert.calledWithExactly(context.Meteor.subscribe, 'users.single', 'id');
    });
    describe('when subscription is ready', () => {
      it('should find and pass a user on to onData', () => {
        const user = getUser();
        const context = getContext();
        context.Meteor.subscribe.returns({ ready: () => true});
        context.Collections.Users.findOne.returns(user);
        const onData = spy();

        composer({context: () => context, userId: 'id'}, onData);

        const [userIdFound] = context.Collections.Users.findOne.args[0];
        expect(userIdFound).to.be.equal('id');

        const [_, props] = onData.args[0];
        expect(_).to.be.equal(null);
        expect(props.user).to.deep.equal({
          _id: user._id,
          name: user.profile.name,
          phone: user.profile.phone,
          email: user.email(),
        });
        expect(props.error).to.be.equal(undefined);
      });
      describe('if there is USER_ERROR', () => {
        it('should pass the error on to onData', () => {
          const user = getUser();
          const context = getContext();
          context.Meteor.subscribe.returns({ ready: () => true});
          context.Collections.Users.findOne.returns(user);
          context.LocalState.get.returns('oops')
          const onData = spy();

          composer({context: () => context, userId: 'id'}, onData);

          const [_, {error}] = onData.args[0];

          expect(error).to.be.equal('oops');
        });
      });
    });
  });
  describe('depsMapper', () => {
    it('should map context to a function', () => {
      const context = { Meteor: {} };
      const actions = {
        users: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map handleUpdateUser to users.update', () => {
      const context = { Meteor: {} };
      const actions = {
        users: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);
      const user = {
        name: 'name',
        email: 'email',
        phone: 'phone',
      };
      const event = {
        preventDefault: spy(),
        target: {
          name: {value: user.name},
          email: {value: user.email},
          phone: {value: user.phone},
        }
      };
      props.handleUpdateUser('id', event);
      assert.calledOnce(actions.users.update);
      assert.calledWithExactly(actions.users.update, 'id', {
        name: user.name,
        phone: user.phone
      });
    });
    it('should map users.clearErrors to clearErrors', () => {
      const context = { Meteor: {} };
      const actions = {
        users: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      props.clearErrors();

      expect(actions.users.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
