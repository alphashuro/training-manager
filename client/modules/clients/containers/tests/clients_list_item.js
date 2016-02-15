const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer} from '../clients_list_item';

describe('clients.containers.client_list_item', () => {
  describe('composer', () => {
    const getCollections = (client) => {
      const Collections = {
        Clients: {findOne: stub()}
      };
      Collections.Clients.findOne.returns(client);
      return Collections;
    };

    it('should subscribe to the given clientId via prop', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const Collections = getCollections();

      const context = () => ({Meteor, Collections});
      const clientId = 'client';
      const onData = spy();

      composer({context, clientId}, onData);
      const args = Meteor.subscribe.args[0];
      expect(args.slice(0,2)).to.deep.equal([
        'clients.single', clientId
      ]);
    });

    describe('after subscribing', () => {
      it('should find the post and send it to onData', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});

        const client = {_id: 'client', name: 'name'};
        const Collections = getCollections(client);

        const context = () => ({Meteor, Collections});
        const clientId = 'asdf';
        const onData = spy();

        composer({context, clientId}, onData);
        expect(onData.args[0]).to.deep.equal([ null, { ...client } ]);
      });
    });
  });
});
