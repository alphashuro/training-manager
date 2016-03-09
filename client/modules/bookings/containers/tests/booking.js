const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer, depsMapper} from '../booking';

describe('bookings.containers.booking', () => {
  describe('composer', () => {
    const getCollections = (booking) => ({
      Bookings: {
        findOne: stub().returns(booking)
      }
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
      const LocalState = {get: stub().returns(null)};
      const Meteor = {
        subscribe: stub().returns({ready: () => true})
      };
      const booking = {
        _id: 'id',
        course: () => ({}),
        facilitator: () => ({})
      };
      const Collections = getCollections(booking);
      const clearErrors = spy();

      const context = () => ({Meteor,LocalState, Collections});
      const onData = spy();
      composer({context, bookingId: 'id', clearErrors}, onData);

      expect(onData.args[0][0]).to.deep.equal(null);
      expect(onData.args[0][1]).to.deep.equal({
        booking,
        course: booking.course(),
        facilitator: booking.facilitator(),
        error: null
      });
    });
    it('should call onData with error if there is error', () => {
      const LocalState = {get: stub().returns('oops')};
      const Meteor = {
        subscribe: stub().returns({ready: () => true})
      };
      const booking = {
        _id: 'id',
        course: () => ({}),
        facilitator: () => ({})
      };
      const Collections = getCollections(booking);
      const clearErrors = spy();

      const context = () => ({Meteor,LocalState, Collections});
      const onData = spy();
      composer({context, bookingId: 'id', clearErrors}, onData);

      expect(onData.args[0][1].error).to.be.equal('oops');
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      bookings: {
        update: spy(),
        clearErrors: spy()
      }
    });
    it('should correctly map context', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should correctly map update', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.update();
      expect(actions.bookings.update.calledOnce).to.be.equal(true);
    });
    it('should correctly map clearErrors', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.clearErrors();
      expect(actions.bookings.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
