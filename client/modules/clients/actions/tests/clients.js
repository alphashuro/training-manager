const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../clients.js';

describe('clients.actions', () => {
  const getClient = () => ({
    name: 'name',
    phone: 'phone',
    email: 'email',
  });
  describe('create', () => {
    it('should reject if name is not given', () => {
      const LocalState = {set: spy()};
      const client = getClient();
      client.name = null;

      actions.create({LocalState}, client);
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('CLIENT_ERROR');
      expect(args[1]).to.match(/name/i);
      expect(args[1]).to.match(/required/);
    });
    it('should reject if phone is not given', () => {
      const LocalState = {set: spy()};
      const client = getClient();
      client.phone = null;

      actions.create({LocalState}, client);
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('CLIENT_ERROR');
      expect(args[1]).to.match(/name/i);
      expect(args[1]).to.match(/required/);
    });
    it('should reject if email is not given', () => {
      const LocalState = {set: spy()};
      const client = getClient();
      client.email = null;

      actions.create({LocalState}, client);
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('CLIENT_ERROR');
      expect(args[1]).to.match(/email/i);
      expect(args[1]).to.match(/required/);
    });
    it('should set CLIENT_ERROR to null', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy(), uuid: spy(), user: stub()};
      const client = getClient();

      actions.create({LocalState, Meteor}, client);
      const args = LocalState.set.args[0];
      expect(args).to.deep.equal([ 'CLIENT_ERROR', null ]);
    });
    it(`should call Meteor.call
      with options { _id, name, phone, email }
      and a cb function`, () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy(), uuid: stub(), user: stub()};
      Meteor.uuid.returns('id');
      const client = getClient();

      actions.create({LocalState, Meteor}, client);
      const args = Meteor.call.args[0];
      expect(args[0]).to.be.equal('clients.create');
      expect(args[1]).to.deep.equal({
        _id: 'id',
        ...client,
      });
      expect(args[2]).to.be.a('function');
    });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set CLIENT_ERROR with the error', () => {
          const LocalState = {set: spy()};
          const Meteor = {call: stub(), uuid: stub(), user: stub()};
          Meteor.uuid.returns('id');
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(2, err);
          const client = getClient();

          actions.create({LocalState, Meteor}, client);
          const args = LocalState.set.args[1];

          expect(args).to.deep.equal(['CLIENT_ERROR', err.reason]);
        });
      });
      it('should redirect to client details page', () => {
        const LocalState = {set: spy()};
        const FlowRouter = {go: spy()};
        const Meteor = {call: stub(), uuid: stub(), user: stub()};
        Meteor.uuid.returns('id');
        Meteor.call.callsArg(2);
        const client = getClient();

        actions.create({LocalState, Meteor, FlowRouter}, client);
        const args = FlowRouter.go.args[0];

        expect(args[0]).to.be.equal(`/clients/id`);
      });
    });


  });
  describe('remove', () => {
    it('should reject if id is not given', () => {
      const LocalState = {set: spy()};

      actions.remove({LocalState}, null);

      expect(LocalState.set.args[0][0]).to.be.equal('CLIENT_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/id/i);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should call Meteor.call with the id', () => {
      const Meteor = {call: spy()};

      actions.remove({Meteor}, 'id');

      const args = Meteor.call.args[0];
      expect(args.slice(0, 2)).to.deep.equal([ 'clients.remove', 'id' ]);
      expect(args[2]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set CLIENT_ERROR with the error reason', () => {
          const Meteor = {call: stub()};
          const LocalState = {set: spy()};
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(2, err);

          actions.remove({Meteor, LocalState}, 'id');
          const args = LocalState.set.args[0];
          expect(args).to.deep.equal([ 'CLIENT_ERROR', err.reason ]);
        });
      });
    });
  });
  describe('update', () => {
    it('should reject if id is not given', () => {
      const LocalState = {set: spy()};

      actions.update({LocalState}, null, {});
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('CLIENT_ERROR');
      expect(args[1]).to.match(/id/i);
      expect(args[1]).to.match(/required/);
    });
    it('should reject if options are not given', () => {
      const LocalState = {set: spy()};

      actions.update({LocalState}, 'id', {});
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('CLIENT_ERROR');
      expect(args[1]).to.match(/name/i);
      expect(args[1]).to.match(/phone/i);
      expect(args[1]).to.match(/email/i);
      expect(args[1]).to.match(/required/);
    });
    it(`should call Meteor.call with the id,
      and options { name, phone, email }
      and a cb`, () => {
      const Meteor = {call: spy()};
      const client = getClient();

      actions.update({Meteor}, 'id', client);
      const args = Meteor.call.args[0];

      expect(args[0]).to.be.equal('clients.update');
      expect(args[1]).to.be.equal('id');
      expect(args[2]).to.deep.equal(client);
      expect(args[3]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set CLIENT_ERROR with the error reason', () => {
          const Meteor = {call: stub()};
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(3, err);
          const LocalState = {set: spy()};
          const client = getClient();

          actions.update({Meteor, LocalState}, 'id', client);

          expect(LocalState.set.args[0]).to.deep.equal([
            'CLIENT_ERROR', err.reason
          ]);
        });
      });
    });
  });
  describe('clearErrors', () => {
    it('should clear CLIENT_ERROR', () => {
      const LocalState = {set: spy()};

      actions.clearErrors({LocalState});

      expect(LocalState.set.args[0]).to.deep.equal([ 'CLIENT_ERROR', null ]);
    });
  });
});
