const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer} from '../calendar';

describe('bookings.containers.booking', () => {
  describe('composer', () => {
    const getCollections = (sessions) => ({
      Sessions: {
        find: () => ({
          fetch: () => sessions
        })
      }
    });
    it('should subscribe to sessions.all', () => {
      const Meteor = {
        subscribe: stub().returns({ready: () => false})};

      const context = () => ({Meteor});
      const onData = spy();
      composer({context}, onData);
      expect(Meteor.subscribe.args[0]).to.deep.equal(['sessions.all']);
    });
    it('should call onData with session events', () => {
      const LocalState = {get: stub().returns(null)};
      const Meteor = {
        subscribe: stub().returns({ready: () => true})
      };
      const sessions = [
        { date: 'date', endDate: () => 'end' },
        { date: 'other date', endDate: () => 'other end' }
      ]
      const Collections = getCollections(sessions);
      const clearErrors = spy();

      const context = () => ({Meteor, Collections});
      const onData = spy();
      composer({context}, onData);

      expect(onData.args[0][0]).to.deep.equal(null);
      expect(onData.args[0][1]).to.deep.equal({
        events: [
          { start: 'date', end: 'end' },
          { start: 'other date', end: 'other end'}
        ]
      });
    });
  });
});
