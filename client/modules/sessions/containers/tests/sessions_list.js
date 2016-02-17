const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../sessions_list';

describe('sessions.containers.sessions_list', () => {
  describe('composer', () => {
    it('should subscribe to bookings.sessions with bookingId', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const bookingId = '123';

      const context = () => ({Meteor});
      composer({context, bookingId});

      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'bookings.sessions', bookingId
      ]);
    });
    describe('when subscription is ready', () => {
      it('call onData with sessionIds', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ ready: () => true});
        const Collections = {
          Sessions: { find: stub() }
        };
        const fetch = stub();
        Collections.Sessions.find.returns({fetch});
        fetch.returns([
          { _id: '1' },
          { _id: '2' }
        ]);
        const LocalState = {get: spy()};
        const bookingId = 'bid';
        const clearErrors = spy();

        const onData = spy();

        const context = () => ({Meteor, Collections, LocalState});

        composer({context, bookingId, clearErrors}, onData);

        expect(onData.args[0][0]).to.be.equal(null);
        expect(onData.args[0][1].sessionIds).to.deep.equal([ '1','2' ]);
        expect(onData.args[0][1].error).to.be.equal(undefined);
      });
      describe('if there is SESSIONS_ERROR', () => {
        it('should pass error on to onData', () => {
          const Meteor = {subscribe: stub()};
          Meteor.subscribe.returns({ ready: () => true});
          const Collections = {
            Sessions: { find: stub() }
          };
          const fetch = stub();
          Collections.Sessions.find.returns({fetch});
          fetch.returns([]);
          const err = 'oops';
          const LocalState = {get: stub()};
          LocalState.get.returns(err);

          const bookingId = 'bid';
          const clearErrors = spy();

          const onData = spy();

          const context = () => ({Meteor, Collections, LocalState});

          composer({context, bookingId, clearErrors}, onData);

          expect(onData.args[0][0]).to.be.equal(null);
          expect(onData.args[0][1].sessionIds).to.deep.equal([]);
          expect(onData.args[0][1].error).to.be.equal(err);
        });
      });
    });
  });
  describe('depsMapper', () => {
    it('should map context to a function', () => {
      const context = {Meteor: {}};
      const actions = {sessions: {clearErrors: spy()}};

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map sessions.clearErrors to clearErrors', () => {
      const context = {Meteor: {}};
      const actions = {sessions: {clearErrors: spy()}};

      const props = depsMapper(context, actions);
      props.clearErrors();

      expect(actions.sessions.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
