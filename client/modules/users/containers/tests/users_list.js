const {describe, it} = global;
import {stub, spy} from 'sinon';
import {expect} from 'chai';
import {composer} from '../users_list';

describe(`users.containers.users_list`, () => {
  const getContext = () => ({
    Meteor: { subscribe: stub().returns({ready: () => false}) },
    Collections: {
      Users: {
        find: stub()
        .returns({
          fetch: stub()
          .returns([
            {_id: '1'},
            {_id: '2'}
          ])
        })
      }
    },
    LocalState: { get: stub() }
  });
  describe(`composer`, () => {
    it(`should subscribe to users.ids`, () => {
      const context = getContext();
      composer({context: () => context}, spy());
      const [subscription] = context.Meteor.subscribe.args[0];

      expect(subscription).to.be.equal('users.ids');
    });
    describe(`after subscribing`, () => {
      it(`should get user ids and pass them on to onData`, () => {
        const context = getContext();
        const onData = spy();
        context.Meteor.subscribe.returns({ready: () => true});
        composer({context: () => context}, onData);
        // FIXME: I can't remember what the first argument to onData actually is. Need to find out and rename this underscore accordingly for clarity.
        const [ _ , {error, userIds} ] = onData.args[0];

        expect(_).to.be.equal(null);
        expect(error).to.be.equal(undefined);
        expect(userIds).to.deep.equal(['1', '2']);
      });
      describe(`if there is error`, () => {
        it(`should pass the error on to onData`, () => {
          const context = getContext();
          context.Meteor.subscribe.returns({ready: () => true});
          context.LocalState.get.returns('oops');
          const onData = spy();
          composer({context: () => context}, onData);

          const [_, {error}] = onData.args[0];
          expect(error).to.be.equal('oops')
        });
      });
    });
  });
});
