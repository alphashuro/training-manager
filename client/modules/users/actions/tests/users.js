const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';

import actions from '../users';

describe('users.actions.users', () => {
  describe('invite', () => {
    it('should reject if email is not there', () => {
      const LocalState = {set: spy()};
      actions.invite({LocalState}, null);
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('USERS_ERROR');
      expect(args[1]).to.match(/required/);
    });

    it('should call Meteor.call to invite user', () => {
      const Meteor = { call: spy() };
      const LocalState = {set: spy()};
      actions.invite({LocalState, Meteor}, 'email');
      const methodArgs = Meteor.call.args[0];

      expect(methodArgs.slice(0,2)).to.deep.equal([
        'users.invite', 'email'
      ]);

      expect(methodArgs[2]).to.be.a('function');
    });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set USERS_ERROR with the error reason', () => {
          const Meteor = { call: stub() };
          const LocalState = {set: spy()};
          const err = {reason: 'oops'};
          Meteor.call.callsArgWith(2, err);

          actions.invite({Meteor, LocalState}, 'email');
          expect(LocalState.set.args[0]).to.deep.equal([ 'USERS_ERROR', err.reason ]);
        });
      });
    });
  });

  describe(`setPassword`, () => {
    it(`should reject if token is not given`, () => {
      const LocalState = {set: spy()};
      actions.setPassword({LocalState}, null);
      assert.calledWith(LocalState.set, 'ENROLL_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/token/i);
      expect(LocalState.set.args[0][1]).to.match(/required/i);
    });
    it(`should reject if newPassword is not given`, () => {
      const LocalState = {set: spy()};
      actions.setPassword({LocalState}, 'token', null);
      assert.calledWith(LocalState.set, 'ENROLL_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/password/i);
      expect(LocalState.set.args[0][1]).to.match(/required/i);
    });
    it(`should reject if newPassword is not given`, () => {
      const LocalState = {set: spy()};
      actions.setPassword({LocalState}, 'token', 'newPassword', null);
      assert.calledWith(LocalState.set, 'ENROLL_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/confirm/i);
      expect(LocalState.set.args[0][1]).to.match(/password/i);
    });
    it(`should reject if newPassword !== confirmPassword`, () => {
      const LocalState = {set: spy()};
      actions.setPassword({LocalState}, 'token', 'newPassword', 'confirmPassword');
      assert.calledWith(LocalState.set, 'ENROLL_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/passwords/i);
      expect(LocalState.set.args[0][1]).to.match(/match/i);
    });
    it(`should call Accounts.resetPassword with token and new password`, () => {
      const Accounts = { resetPassword: spy() };
      const LocalState = { set: spy() };
      actions.setPassword({Accounts}, 'token', 'newPassword', 'newPassword');

      assert.calledWith(Accounts.resetPassword, 'token', 'newPassword');
      expect(Accounts.resetPassword.args[0][2]).to.be.a('function');
    });
    describe(`after Accounts.resetPassword`, () => {
      it(`should send the user to /`, () => {
        const Accounts = { resetPassword: stub().callsArg(2) };
        const FlowRouter = { go: spy() };
        actions.setPassword({Accounts, FlowRouter}, 'token', 'newPassword', 'newPassword');

        assert.calledOnce(FlowRouter.go);
        assert.calledWithExactly(FlowRouter.go, '/');
      });
      describe(`if there is error`, () => {
        it(`should set ENROLL_ERROR with the error reason`, () => {
          const err = { reason: 'oops' };
          const Accounts = { resetPassword: stub().callsArgWith(2, err) };
          const LocalState = { set: spy() };
          actions.setPassword({Accounts, LocalState}, 'token', 'newPassword', 'newPassword');
          assert.calledWithExactly(LocalState.set, 'ENROLL_ERROR', err.reason);
        });
      });
    });
  });

  describe('clearErrors', () => {
    it('should clear USERS_ERROR local state', () => {
      const LocalState = { set: spy() };
      actions.clearErrors({LocalState});
      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'USERS_ERROR', null ]);
    });
  });
});
