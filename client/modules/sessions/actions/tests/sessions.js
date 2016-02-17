const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import actions from '../sessions';

describe('sessions.actions.sessions', () => {
  describe('update', () => {
    it('should reject if id is not given', () => {
      const LocalState = {set: spy()};
      const id = null;
      const options = {
        date: 'date'
      };

      actions.update({LocalState}, id, options);

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0][0]).to.be.equal('SESSIONS_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/[Ii]d/);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should reject if date is not given', () => {
      const LocalState = {set: spy()};
      const id = '1';
      const options = {
        date: null
      };

      actions.update({LocalState}, id, options);

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0][0]).to.be.equal('SESSIONS_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/[Dd]ate/);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('calls Meteor.call with the id and date', () => {
      const Meteor = {call: spy()};
      const id = '1';
      const options = {
        date: 'date'
      };

      actions.update({Meteor}, id, options);

      expect(Meteor.call.calledOnce).to.be.equal(true);
      const args = Meteor.call.args[0];
      expect(args[0]).to.be.equal('sessions.update');
      expect(args[1]).to.be.equal(id);
      expect(args[2]).to.deep.equal({date: options.date});
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set SESSIONS_ERROR with error reason', () => {
          const Meteor = {call: stub()};
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(3, err);
          const LocalState = {set: spy()};
          const id = '1';
          const options = {
            date: 'date'
          };

          actions.update({Meteor, LocalState}, id, options);

          expect(LocalState.set.calledOnce).to.be.equal(true);
          expect(LocalState.set.args[0][0]).to.be.equal('SESSIONS_ERROR');
          expect(LocalState.set.args[0][1]).to.be.equal(err.reason);
        });
      });
    });
  });
  describe('clearErrors', () => {
    it('should clear SESSIONS_ERROR', () => {
      const LocalState = {set: spy()};

      actions.clearErrors({LocalState});

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0]).to.deep.equal([
        'SESSIONS_ERROR', null
      ]);
    });
  });
});
