const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';

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

  describe('clearErrors', () => {
    it('should clear USERS_ERROR local state', () => {
      const LocalState = { set: spy() };
      actions.clearErrors({LocalState});
      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'USERS_ERROR', null ]);
    });
  });
});
