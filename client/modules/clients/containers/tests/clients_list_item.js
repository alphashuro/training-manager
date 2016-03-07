const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../clients_list_item';

describe('clients.containers.clients_list_item', () => {
  describe('composer', () => {
    it('should subscribe to clients.single', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const clientId = 'id';

      const context = () => ({Meteor});

      composer({context, clientId});

      expect(Meteor.subscribe.calledOnce).to.be.equal(true);
      const args = Meteor.subscribe.args[0];
      expect(args[0]).to.be.equal('clients.single');
      expect(args[1]).to.be.equal(clientId);
    });
    describe('after subscribing', () => {
      it('should call onData with the client\'s details', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const Collections = {Clients: { findOne: stub() }};
        const client = {
          _id: 'id',
          title: 't-1',
          description: 'd-1'
        };
        Collections.Clients.findOne.returns(client);
        const clientId = 'id';

        const context = () => ({Meteor, Collections});
        const onData = spy();

        composer({context, clientId}, onData);
        const args = onData.args[0];

        expect(onData.calledOnce).to.be.equal(true);
        expect(args[0]).to.be.equal(null);
        expect(args[1]).to.deep.equal(client);
      });
    });
  });
  describe('depsMapper', () => {
    it('should correctly map context', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {
        clients: {
          remove: spy(),
          invite: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.context).to.be.a('function');
      expect(props.context()).to.deep.equal(context);
    });
    it('should correctly map onRemove', () => {
      const context = {};
      const actions = {
        clients: {
          remove: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.onRemove).to.be.a('function');
      props.onRemove();
      expect(actions.clients.remove.calledOnce).to.be.equal(true);
    });
  });
});
