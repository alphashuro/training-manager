const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer, depsMapper} from '../clients_select';

describe('bookings.containers.clients_select', () => {
  describe('composer', () => {
    const getCollections = (client) => ({
      Clients: {
        find: () => ({
          fetch: () => client
        })
      }
    });
    it('should subscribe to clients.list', () => {
      const Meteor = {
        subscribe: stub().returns({ready: () => false})};

      const context = () => ({Meteor});
      const onData = spy();
      composer({context}, onData);
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'clients.list'
      ]);
    });
    it('should call onData with clients list', () => {
      const LocalState = {get: stub().returns(null)};
      const Meteor = {
        subscribe: stub().returns({ready: () => true})
      };
      const clients = [
        {_id:'1'},
        {_id:'2'}
      ]
      const Collections = getCollections(clients);
      const clearErrors = spy();

      const context = () => ({Meteor, Collections});
      const onData = spy();
      composer({context}, onData);

      expect(onData.args[0][0]).to.deep.equal(null);
      expect(onData.args[0][1]).to.deep.equal({
        clients
      });
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      bookingClients: {
        select: spy()
      }
    });
    it('should map context to a function', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map bookingClients.select to props.select', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.select();

      expect(actions.bookingClients.select.calledOnce)
      .to.be.equal(true);
    });
  });
});
