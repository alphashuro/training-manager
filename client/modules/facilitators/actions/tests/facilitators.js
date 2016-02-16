const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../facilitators';

describe('facilitators.actions.facilitators', () => {
  describe('create', () => {
    it('should reject if the name is not there', () => {
      const LocalState = {set: spy()};
      actions.create({LocalState}, null, 'phone', 'email');
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('FACILITATOR_ERROR');
      expect(args[1]).to.match(/required/);
    });

    it('should reject if the phone is not there', () => {
      const LocalState = {set: spy()};
      actions.create({LocalState}, 'name', null, 'email');
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('FACILITATOR_ERROR');
      expect(args[1]).to.match(/required/);
    });

    it('should reject if the email is not there', () => {
      const LocalState = {set: spy()};
      actions.create({LocalState}, 'name', 'phone', null);
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('FACILITATOR_ERROR');
      expect(args[1]).to.match(/required/);
    });

    it('should clear older LocalState for FACILITATOR_ERROR', () => {
      const Meteor = {uuid: spy(), call: spy(), user: stub().returns({profile: {org: 'org'}})};
      const LocalState = {set: spy()};
      const FlowRouter = {go: spy()};

      actions.create({LocalState, Meteor,FlowRouter}, 'name', 'phone', 'email');

      expect(LocalState.set.args[0]).to.deep.equal([ 'FACILITATOR_ERROR', null ]);
    });

    it('should call Meteor.call to save the facilitator', () => {
      const Meteor = {
        uuid: () => '1',
        call: spy(),
        user: () => ({
          profile: {
            org: 'org'
          }
        })
      };
      const LocalState = {set: spy()};
      const FlowRouter = {go: spy()};

      actions.create({LocalState, Meteor,FlowRouter}, 'name', 'phone', 'email');
      const methodArgs = Meteor.call.args[0];

      expect(methodArgs[0]).to.equal( 'facilitators.create' );
      expect(methodArgs[1]).to.deep.equal({
        _id: '1',
        name: 'name',
        phone: 'phone',
        email: 'email',
        org: 'org'
      });
      expect(methodArgs[2]).to.be.a('function');
    });

    it('should redirect user to the facilitator\'s detail page', () => {
      const id = '1';
      const Meteor = {
        uuid: () => id,
        call: stub(),
        user: () => ({
          profile: {
            org: 'org'
          }
        })
      };
      const LocalState = {set: spy()};
      const FlowRouter = {go: spy()};

      Meteor.call.callsArg(2);

      actions.create({LocalState, Meteor,FlowRouter}, 'name', 'phone', 'email');

      expect(FlowRouter.go.args[0][0]).to.be.equal(`/facilitators/${id}`);
    });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set FACILITATOR_ERROR with the error message', () => {
          const id = '1';
          const Meteor = {
            uuid: () => id,
            call: stub(),
            user: () => ({
              profile: {
                org: 'org'
              }
            })
          };
          const LocalState = {set: spy()};
          const FlowRouter = {go: spy()};
          const err = { reason: 'Oops' };

          Meteor.call.callsArgWith(2, err);

          actions.create({LocalState, Meteor,FlowRouter}, 'name', 'phone', 'email');

          expect(LocalState.set.calledTwice).to.be.equal(true);

          const secondArgs = LocalState.set.args[1];
          expect(secondArgs).to.deep.equal([ 'FACILITATOR_ERROR', err.reason ]);
        });
      });
    });
  });

  describe('remove', () => {
    it('should fail if id is not there', () => {
      const LocalState = { set: spy() };
      actions.remove({LocalState}, null);
      const args = LocalState.set.args[0];

      expect(args[0]).to.be.equal('FACILITATOR_ERROR');
      expect(args[1]).to.match(/required/);
    });

    it('should call Meteor.call to remove the facilitator', () => {
      const Meteor = { call: spy() };
      const LocalState = { set: spy() };

      const facilitator = { name: 'name', phone: 'phone', email: 'email' };

      actions.remove({Meteor, LocalState}, '1', facilitator);

      const methodArgs = Meteor.call.args[0];

      expect(methodArgs[0]).to.be.equal('facilitators.remove');
      expect(methodArgs[1]).to.be.equal('1');
      expect(methodArgs[2]).to.be.a('function');
    });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set FACILITATOR_ERROR with the error message', () => {
          const Meteor = { call: stub() };
          const LocalState = { set: spy() };
          const err = {reason: 'Oops'};
          Meteor.call.callsArgWith(2, err);

          actions.remove({Meteor, LocalState}, '1');

          expect(LocalState.set.args[0]).to.deep.equal([ 'FACILITATOR_ERROR', err.reason ]);
        });
      });
    });
  });

  describe('update', () => {

    it('should call Meteor.call to update the facilitator', () => {
      const Meteor = { call: spy() };
      const LocalState = { set: spy() };

      const facilitator = { name: 'name', phone: 'phone', email: 'email' };

      actions.update({Meteor, LocalState}, '1', facilitator);

      const methodArgs = Meteor.call.args[0];

      expect(methodArgs[0]).to.be.equal('facilitators.update');
      expect(methodArgs[1]).to.be.equal('1');
      expect(methodArgs[2]).to.deep.equal(facilitator);
      expect(methodArgs[3]).to.be.a('function');
    });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set FACILITATOR_ERROR with the error message', () => {
          const Meteor = { call: stub() };
          const LocalState = { set: spy() };
          const err = {reason: 'Oops'};
          Meteor.call.callsArgWith(3, err);
          const facilitator = { name: 'name', phone: 'phone', email: 'email' };

          actions.update({Meteor, LocalState}, '1', facilitator);

          expect(LocalState.set.args[0]).to.deep.equal([ 'FACILITATOR_ERROR', err.reason ]);
        });
      });
    });
  });

  describe('invite', () => {
    it('should reject if email is not defined', () => {
      const LocalState = {set: spy()};

      actions.invite({LocalState}, null);
      const args = LocalState.set.args[0];

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(args[0]).to.be.equal( 'FACILITATOR_ERROR' );
      expect(args[1]).to.match(/required/);
    });

    it('should call Meteor.call with the email to invite', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy(), user: stub()};
      Meteor.user.returns({ profile: { org: 'an-org' }});

      actions.invite({LocalState, Meteor}, 'email');
      const args = Meteor.call.args[0];

      expect(Meteor.call.calledOnce).to.be.equal(true);
      expect(args[0]).to.be.equal('facilitators.invite');
      expect(args[1]).to.deep.equal({
        email: 'email',
        org: 'an-org'
      });
      expect(args[2]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set FACILITATOR_ERROR with the error', () => {
          const Meteor = {call: stub(), user: stub()};
          Meteor.user.returns({profile: { org: 'an-org' }});
          const err = {reason: 'oops'};
          Meteor.call.callsArgWith(2, err);
          const LocalState = {set: spy()};

          actions.invite({Meteor, LocalState}, 'email');
          const args = LocalState.set.args[0];

          expect(args[0]).to.be.equal('FACILITATOR_ERROR');
          expect(args[1]).to.be.equal(err.reason);
        });
      });
    });
  });

  describe('clearErrors', () => {
    it('should clear FACILITATOR_ERROR local state', () => {
      const LocalState = {set: spy()};
      actions.clearErrors({LocalState});
      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'FACILITATOR_ERROR', null ]);
    });
  });
});
