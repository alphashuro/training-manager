const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../students.js';

describe('bookings.actions.students', () => {
  describe('showModal', () => {
    it('should set STUDENTS_MODAL to true on LocalState', () => {
      const LocalState = {set: spy()};

      actions.showModal({LocalState});

      expect(LocalState.set.args[0]).to.deep.equal([
        'STUDENTS_MODAL', true
      ]);
    });
  });
  describe('closeModal', () => {
    it('should set STUDENTS_MODAL to false on LocalState', () => {
      const LocalState = {set: spy()};

      actions.closeModal({LocalState});

      expect(LocalState.set.args[0]).to.deep.equal([
        'STUDENTS_MODAL', false
      ]);
    });
  });
  describe('add', () => {
    it('should reject if bookingId is not given', () => {
      const LocalState = {set: spy()};

      actions.add({LocalState}, null, 'id');

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('BOOKING_STUDENTS_ERROR');
      expect(args[1]).to.match(/booking/i);
      expect(args[1]).to.match(/required/);
    });
    it('should reject if studentId is not given', () => {
      const LocalState = {set: spy()};

      actions.add({LocalState}, 'id', null);
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('BOOKING_STUDENTS_ERROR');
      expect(args[1]).to.match(/student/i);
      expect(args[1]).to.match(/required/);
    });
    it('should set BOOKING_STUDENTS_ERROR to null', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy()};

      actions.add({LocalState, Meteor}, 'booking', 'student');

      expect(LocalState.set.args[0]).to.deep.equal([
        'BOOKING_STUDENTS_ERROR', null
      ]);
    });
    it('should call Meteor.call with bookingId and studentId', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy()};

      actions.add({LocalState, Meteor}, 'booking', 'student');
      expect(Meteor.call.calledOnce).to.be.equal(true);
      expect(Meteor.call.args[0].slice(0, 3)).to.deep.equal([
        'bookings.addStudent', 'booking', 'student'
      ]);
      expect(Meteor.call.args[0][3]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set BOOKING_STUDENTS_ERROR with error', () => {
          const LocalState = {set: spy()};
          const Meteor = {call: stub()};
          const err = {reason: 'oops'}
          Meteor.call.callsArgWith(3, err);

          actions.add({LocalState, Meteor}, 'booking', 'student');

          expect(LocalState.set.args[1]).to.deep.equal([
            'BOOKING_STUDENTS_ERROR', 'oops'
          ]);
        });
      });
    });
  });
  describe('remove', () => {
    it('should reject if bookingId is not given', () => {
      const LocalState = {set: spy()};

      actions.remove({LocalState}, null, 'id');

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('BOOKING_STUDENTS_ERROR');
      expect(args[1]).to.match(/booking/i);
      expect(args[1]).to.match(/required/);
    });
    it('should reject if studentId is not given', () => {
      const LocalState = {set: spy()};

      actions.remove({LocalState}, 'id', null);

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('BOOKING_STUDENTS_ERROR');
      expect(args[1]).to.match(/booking/i);
      expect(args[1]).to.match(/required/);
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set BOOKING_STUDENTS_ERROR with error', () => {
          const LocalState = {set: spy()};
          const Meteor = {call: stub()};
          const err = {reason: 'oops'}
          Meteor.call.callsArgWith(3, err);

          actions.remove({LocalState, Meteor}, 'booking', 'student');

          expect(LocalState.set.args[0]).to.deep.equal([
            'BOOKING_STUDENTS_ERROR', 'oops'
          ]);
        });
      });
    });
  });
  describe('clearErrors', () => {
    it('should set BOOKING_STUDENTS_ERROR to null', () => {
      const LocalState = {set: spy()};
      actions.clearErrors({LocalState});
      expect(LocalState.set.args[0]).to.deep.equal([
        'BOOKING_STUDENTS_ERROR', null
      ]);
    });
  });
});
