const {describe, it} = global;
import {stub, spy} from 'sinon';
import {expect} from 'chai';
import {composer} from '../clients_list';

describe('clients.containers.clients_list', () => {
  describe('composer', () => {
    it('subscribes to clients.ids', () => {
      const Meteor = { subscribe: stub() };
      Meteor.subscribe.returns({ready: () => false});

      const context = () => ({Meteor});
      composer({context});
      const args = Meteor.subscribe.args[0];

      expect(args[0]).to.be.equal('clients.ids');
    });
    describe('after subscribing', () => {
      it('gets client ids and passes them on to onData', () => {
        const Meteor = { subscribe: stub() };
        Meteor.subscribe.returns({ready: () => true});
        const Collections = { Clients: {find: stub()} };
        const cursor = {fetch: stub()};
        Collections.Clients.find.returns(cursor);
        const clients = [
          {_id: '1'},
          {_id: '2'}
        ];
        cursor.fetch.returns(clients);
        const LocalState = {get: spy()};
        const onData = spy();

        const context = () => ({Meteor, Collections, LocalState});
        composer({context}, onData);
        const args = onData.args[0];

        expect(args[0]).to.be.equal(null);
        expect(args[1].clientIds).to.deep.equal([ '1','2' ]);
        expect(args[1].error).to.be.equal(undefined);
      });
      describe('if there is error', () => {
        it('passes error on to onData', () => {
          const Meteor = { subscribe: stub() };
          Meteor.subscribe.returns({ready: () => true});
          const Collections = { Clients: {find: stub()} };
          const cursor = {fetch: stub()};
          Collections.Clients.find.returns(cursor);
          const clients = [];
          cursor.fetch.returns(clients);
          const LocalState = {get: stub()};
          LocalState.get.returns('oops');
          const onData = spy();

          const context = () => ({Meteor, Collections, LocalState});
          composer({context}, onData);
          const args = onData.args[0];

          expect(args[1].error).to.be.equal('oops');
        });
      });
    });
  });
});
