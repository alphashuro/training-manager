const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../bookings.js';

describe('bookings.actions', () => {
  describe('create', () => {
    it('should reject if courseId is not given', () => {
      const LocalState = {set: spy()};

      actions.create({LocalState}, null, 'description');
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('BOOKING_ERROR');
      expect(args[1]).to.match(/course/i);
      expect(args[1]).to.match(/required/);
    });

    it('should reject if facilitatorId is not given', () => {
      const LocalState = {set: spy()};

      actions.create({LocalState}, 'title', null);
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('BOOKING_ERROR');
      expect(args[1]).to.match(/facilitator/i);
      expect(args[1]).to.match(/required/);
    });

    it('should set BOOKING_ERROR to null', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy(), uuid: spy(), user: stub()};
      Meteor.user.returns({profile: {org: 'an org'}});

      actions.create({LocalState, Meteor}, 'title', 'description');
      const args = LocalState.set.args[0];
      expect(args).to.deep.equal([ 'BOOKING_ERROR', null ]);
    });

    it(`should call Meteor.call
        with options { _id, courseId, facilitatorId, org }
        and a cb function`, () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy(), uuid: stub(), user: stub()};
      Meteor.uuid.returns('id');
      Meteor.user.returns({profile: {org: 'org'}});

      actions.create({LocalState, Meteor}, 'courseId', 'facilitatorId');
      const args = Meteor.call.args[0];
      expect(args[0]).to.be.equal('bookings.create');
      expect(args[1]).to.deep.equal({
        _id: 'id',
        courseId: 'courseId',
        facilitatorId: 'facilitatorId',
        org: 'org'
      });
      expect(args[2]).to.be.a('function');
    });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set BOOKING_ERROR with the error', () => {
          const LocalState = {set: spy()};
          const Meteor = {call: stub(), uuid: stub(), user: stub()};
          Meteor.uuid.returns('id');
          Meteor.user.returns({profile: {org: 'org'}});
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(2, err);

          actions.create({LocalState, Meteor}, 'courseId', 'facilitatorId');
          const args = LocalState.set.args[1];

          expect(args).to.deep.equal(['BOOKING_ERROR', err.reason]);
        });
      });
      it('should redirect to booking details page', () => {
        const LocalState = {set: spy()};
        const FlowRouter = {go: spy()};
        const Meteor = {call: stub(), uuid: stub(), user: stub()};
        Meteor.uuid.returns('id');
        Meteor.user.returns({profile: {org: 'org'}});
        Meteor.call.callsArg(2);

        actions.create({LocalState, Meteor, FlowRouter}, 'title', 'description');
        const args = FlowRouter.go.args[0];

        expect(args[0]).to.be.equal(`/bookings/id`);
      });
    });
  });
  describe('remove', () => {
    it('should reject if id is not given', () => {
      const LocalState = {set: spy()};

      actions.remove({LocalState}, null);

      expect(LocalState.set.args[0][0]).to.be.equal('BOOKING_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/id/i);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should call Meteor call with the id', () => {
      const Meteor = {call: spy()};

      actions.remove({Meteor}, 'id');

      const args = Meteor.call.args[0];
      expect(args.slice(0, 2)).to.deep.equal([ 'bookings.remove', 'id' ]);
      expect(args[2]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set BOOKING_ERROR with the error reason', () => {
          const Meteor = {call: stub()};
          const LocalState = {set: spy()};
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(2, err);

          actions.remove({Meteor, LocalState}, 'id');
          const args = LocalState.set.args[0];
          expect(args).to.deep.equal([ 'BOOKING_ERROR', err.reason ]);
        });
      });
    });
  });
  describe('clearErrors', () => {
    it('should clear BOOKING_ERROR', () => {
      const LocalState = {set: spy()};

      actions.clearErrors({LocalState});

      expect(LocalState.set.args[0]).to.deep.equal([ 'BOOKING_ERROR', null ]);
    });
  });
});
