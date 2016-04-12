const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy, assert} from 'sinon';
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
      const LocalState = { get: spy() };

      const context = () => ({Meteor, LocalState});
      const onData = spy();
      composer({context}, onData);
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'clients.list'
      ]);
    });
    it(`should get current clientId from LocalState`, () => {
      const LocalState = { get: spy() };
      const Meteor = {
        subscribe: stub().returns({ready: () => false})
      };

      const context = () => ({Meteor, LocalState});
      composer({context}, spy());

      assert.calledOnce(LocalState.get);
      assert.calledWithExactly(LocalState.get, 'SELECTED_CLIENT');
    });
    it('should call onData with clients list and current clientId', () => {
      const LocalState = {get: stub().returns('clientId')};
      const Meteor = {
        subscribe: stub().returns({ready: () => true})
      };
      const clients = [
        {_id:'1'},
        {_id:'2'}
      ]
      const Collections = getCollections(clients);
      const clearErrors = spy();

      const context = () => ({Meteor, Collections, LocalState});
      const onData = spy();
      composer({context}, onData);

      expect(onData.args[0][0]).to.deep.equal(null);
      expect(onData.args[0][1]).to.deep.equal({
        selectedClient: 'clientId',
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
    it('should map handleClientSelected to call bookingClients.select with value from event target', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);
      const event = {
        target: {value: 'clientId'}
      };
      props.handleClientSelected(event);

      assert.calledOnce(actions.bookingClients.select);
      assert.calledWithExactly(actions.bookingClients.select, 'clientId');
    });
  });
});
