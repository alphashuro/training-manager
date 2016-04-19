const {describe, it} = global;
import {expect} from 'chai';
import {assert, spy, stub} from 'sinon';
import {composer, depsMapper} from '../users_list_item';

describe(`users.containers.users_list_item`, () => {
  describe(`composer`, () => {
    const getContext = (user = {
      _id: 'id',
      emails: [
        { address: 'user@address.com' }
      ],
      profile: {
        name: 'user',
        phone: '123'
      },
      roles: ['admin', 'facilitator'],
      email() { return this.emails[0].address },
      name() { return this.profile.name },
      phone() { return this.profile.phone }
    }) => ({
      Meteor: { subscribe: stub().returns({ready: () => false}) },
      Collections: { Users: { findOne: stub().returns(user) } },
      user,
    });
    it(`should subscribe to users.single`, () => {
      const context = getContext();
      const userId = 'id';

      composer({context: () => context, userId});

      assert.calledOnce(context.Meteor.subscribe);
      assert.calledWithExactly(context.Meteor.subscribe, 'users.single', 'id');
    });
    describe(`after subscribing`, () => {
      it(`should call onData with the user's details`, () => {
        const context = getContext();
        const userId = 'id';
        context.Meteor.subscribe.returns({ready: () => true});
        const onData = spy();
        composer({context: () => context, userId}, onData);

        assert.calledOnce(onData);

        const [error, props] = onData.args[0];

        expect(error, null);
        expect(props).to.deep.equal({
          _id: context.user._id,
          email: context.user.email(),
          name: context.user.name(),
          phone: context.user.phone(),
          roles: context.user.roles.toString()
        })
      });
    });
  });

  describe(`depsMapper`, () => {
    const getActions = () => ({
      users: {
        remove: spy(),
        sendResetPasswordEmail: spy(),
        invite: spy()
      }
    });
    it(`should map context to a function`, () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context).to.be.a('function');
      expect(props.context()).to.deep.equal(context);
    });
    it(`should map actions.users.remove to handleRemove`, () => {
      const context = {};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.handleRemove).to.be.a('function');
      props.handleRemove('id');
      assert.calledOnce(actions.users.remove);
      assert.calledWithExactly(actions.users.remove, 'id');
    });
    it(`should map actions.users.sendResetPasswordEmail to handleSendResetPasswordEmail`, () => {
      const context = {};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.handleSendResetPasswordEmail).to.be.a('function');
      props.handleSendResetPasswordEmail('id');
      assert.calledOnce(actions.users.sendResetPasswordEmail);
      assert.calledWithExactly(actions.users.sendResetPasswordEmail, 'id');
    });
    it(`should map actions.users.invite to handleSendInvite`, () => {
      const context = {};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.handleSendInvite).to.be.a('function');
      props.handleSendInvite('id');
      assert.calledOnce(actions.users.invite);
      assert.calledWithExactly(actions.users.invite, 'id');
    });
  });
});
