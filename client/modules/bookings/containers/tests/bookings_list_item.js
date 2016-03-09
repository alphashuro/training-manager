const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer, depsMapper} from '../bookings_list_item';

describe('bookings.containers.bookings_list_item', () => {
  describe('composer', () => {
    const getCollections = (booking) => ({
      Bookings: {
        findOne: stub().returns(booking)
      }
    });
    const getBooking = () => ({
      _id: 'id',
      course: () => ({}),
      facilitator: () => ({}),
      students: () => []
    });
    it('should subscribe to bookings.single', () => {
      const Meteor = {
        subscribe: stub().returns({ready: () => false})};

      const context = () => ({Meteor});
      const onData = spy();
      composer({context, bookingId: 'id'}, onData);
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'bookings.single', 'id'
      ]);
    });
    it('should call onData with booking, course and facilitator', () => {
      const Meteor = {
        subscribe: stub().returns({ready: () => true})
      };
      const booking = getBooking();
      const Collections = getCollections(booking);
      const clearErrors = spy();

      const context = () => ({Meteor, Collections});
      const onData = spy();
      composer({context, bookingId: 'id'}, onData);

      expect(onData.args[0][0]).to.deep.equal(null);
      expect(onData.args[0][1]).to.deep.equal({
        ...booking,
        course: booking.course(),
        facilitator: booking.facilitator(),
        students: booking.students()
      });
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      bookings: {
        remove: spy()
      }
    });
    it('should correctly map context', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should correctly map onRemove', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.onRemove();
      expect(actions.bookings.remove.calledOnce).to.be.equal(true);
    });
  });
});
