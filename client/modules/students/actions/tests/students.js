const { describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../students';

describe('students.actions.students', () => {
  describe('create', () => {
    it('should reject if clientId is not given', () => {
      const LocalState = {set: spy()};

      actions.create({LocalState}, null);
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('STUDENTS_ERROR');
      expect(args[1]).to.match(/required/);
    });
    it('should clear older LocalState for STUDENTS_ERROR', () => {
      const Meteor = {uuid: spy(), call: spy()};
      const LocalState = {set: spy()};

      actions.create({LocalState, Meteor}, '1');

      expect(LocalState.set.args[0]).to.deep.equal([ 'STUDENTS_ERROR', null ]);
    });
    it('should call Meteor.call to save the student', () => {
      const Meteor = {uuid: () => 'id', call: spy()};
      const LocalState = {set: spy()};

      actions.create({LocalState, Meteor}, 'clientId');
      const methodArgs = Meteor.call.args[0];

      expect(methodArgs[0]).to.be.equal('students.create');
      expect(methodArgs[1]).to.deep.equal({
        _id: 'id',
        name: '',
        phone: '',
        email: '',
        clientId: 'clientId'
      });
      expect(methodArgs[2]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is an error', () => {
        it('should set STUDENTS_ERROR with the error message', () => {
          const Meteor = {uuid: () => 'id', call: stub()};
          const LocalState = {set: spy()};
          const err = {reason: 'Oops'};
          Meteor.call.callsArgWith(2, err);

          actions.create({Meteor, LocalState}, 'clientId');

          expect(LocalState.set.args[1]).to.deep.equal([ 'STUDENTS_ERROR', err.reason ]);
        });
      });
    });
  });
  describe('remove', () => {
    it('should reject if id is not given', () => {
      const LocalState = {set: spy()};
      actions.remove({LocalState}, null );
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('STUDENTS_ERROR');
      expect(args[1]).to.match(/required/);
      expect(args[1]).to.match(/student/);
    });
    it('should call Meteor.call with the student id', () => {
      const Meteor = {call: spy()};
      const LocalState = {set: spy()};

      actions.remove({Meteor, LocalState}, 'studentId');
      const methodArgs = Meteor.call.args[0];

      expect(methodArgs[0]).to.be.equal('students.remove');
      expect(methodArgs[1]).to.be.equal('studentId');
      expect(methodArgs[2]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is an error', () => {
        it('should set STUDENTS_ERROR with the error message', () => {
          const Meteor = { call: stub() };
          const LocalState = {set: spy()};
          const err = {reason: 'Oops'};
          Meteor.call.callsArgWith(2, err);

          actions.remove({Meteor, LocalState}, 'studentId');
          expect(LocalState.set.args[0]).to.deep.equal([ 'STUDENTS_ERROR', err.reason ]);
        });
      });
    });
  });
  describe('update', () => {
    it('should reject if id is not given', () => {
      const LocalState = { set: spy() };
      actions.update( {LocalState}, null,
        {
          name: 'name',
          phone: 'phone',
          email: 'email'
        });
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('STUDENTS_ERROR');
      expect(args[1]).to.match(/id/);
      expect(args[1]).to.match(/required/);
    });
    it('should reject if update options are not given', () => {
      const LocalState = { set: spy() };
      actions.update( {LocalState}, 'studentId', null );
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('STUDENTS_ERROR');
      expect(args[1]).to.match(/options/);
      expect(args[1]).to.match(/required/);
    });
    it('should call Meteor.call with the student id and info', () => {
      const Meteor = { call: spy() };
      const LocalState = { set: spy() };
      const options = {
        name: 'name',
        phone: 'phone',
        email: 'email'
      };

      actions.update({Meteor, LocalState}, 'studentId', options);
      const methodArgs = Meteor.call.args[0];

      expect(methodArgs[0]).to.be.equal('students.update');
      expect(methodArgs[1]).to.be.equal('studentId');
      expect(methodArgs[2]).to.deep.equal(options);
      expect(methodArgs[3]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is an error', () => {
        it('should set STUDENTS_ERROR with the error message', () => {
          const Meteor = { call: stub() };
          const LocalState = { set: spy() };
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(3, err);
          const options = {
            name: 'name',
            phone: 'phone',
            email: 'email'
          };

          actions.update({Meteor, LocalState}, 'studentId', options);
          expect(LocalState.set.args[0]).to.deep.equal([ 'STUDENTS_ERROR', err.reason ]);
        });
      });
    });
  });
  describe('clearErrors', () => {
    it('should clear STUDENTS_ERROR local state', () => {
      const LocalState = { set: spy() };
      actions.clearErrors({LocalState});
      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'STUDENTS_ERROR', null ]);
    });
  });
});
