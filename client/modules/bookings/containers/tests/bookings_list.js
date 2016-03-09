import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer, depsMapper} from '../bookings_list';

describe('bookings.containers.bookings_list', () => {
  describe('composer', () => {
    const getCollections = (bookings) => ({
      Bookings: {
        find: () => ({
          fetch: () => bookings
        })
      }
    });
    it('should subscribe to bookings.ids', () => {
      const Meteor = {
        subscribe: stub().returns({ready: () => false})};

      const context = () => ({Meteor});
      const onData = spy();
      composer({context}, onData);
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'bookings.ids'
      ]);
    });
    it('should call onData with booking, course and facilitator', () => {
      const LocalState = {get: stub().returns(null)};
      const Meteor = {
        subscribe: stub().returns({ready: () => true})
      };
      const bookings = [
        { _id: '1' },
        { _id: '2' },
        { _id: '3' }
      ];
      const Collections = getCollections(bookings);
      const clearErrors = spy();

      const context = () => ({Meteor,LocalState, Collections});
      const onData = spy();
      composer({context}, onData);

      expect(onData.args[0][0]).to.deep.equal(null);
      expect(onData.args[0][1]).to.deep.equal({
        bookingIds: ['1', '2', '3']
      });
    });
  });
});
