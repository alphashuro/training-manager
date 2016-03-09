const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../client.js';

describe('clients.containers.client', () => {
  describe('composer', () => {
    it('should subscribe to clients.single with given clientId', () => {
      const Meteor = {
        subscribe: stub().returns({
          ready: () => false
        })};
      const clientId = '123';

      const context = () => ({Meteor});

      composer({context, clientId});

      expect(Meteor.subscribe.args[0].slice(0, 2)).to.deep.equal([
        'clients.single', clientId
      ]);
    });
    describe('when subscription is ready', () => {
      it('should find and pass a client on to onData', () => {
        const Meteor = {
          subscribe: stub().returns({
            ready: () => true
          })
        };
        const clientId = '123';
        const client = {
          _id: '123',
          name: 'name',
          phone: 'phone',
          email: 'email'
        };
        const Collections = {
          Clients: {
            findOne: stub().returns(client)
          }
        };
        const LocalState = {get: spy()};

        const context = () => ({Meteor, Collections, LocalState});
        const onData = spy();

        composer({context, clientId}, onData);

        expect(Collections.Clients.findOne.args[0][0]).to.be.equal(clientId);
        const args = onData.args[0];
        expect(args[0]).to.be.equal(null);
        expect(args[1].client).to.deep.equal(client);
        expect(args[1].error).to.be.equal(undefined);
      });
      describe('if there is CLIENT_ERROR', () => {
        it('should pass the error on to onData', () => {
          const Meteor = {
          subscribe: stub().returns({
            ready: () => true
          })
        };
        const clientId = '123';
        const client = {
          _id: '123',
          name: 'name',
          phone: 'phone',
          email: 'email'
        };
        const Collections = {
          Clients: {
            findOne: stub().returns(client)
          }
        };
          const err = 'oops';
          const LocalState = {get: stub().returns(err)};

          const context = () => ({Meteor, Collections, LocalState});
          const onData = spy();

          composer({context, clientId}, onData);
          const args = onData.args[0];

          expect(args[1].error).to.be.equal(err);
        });
      });
    });
  });
  describe('depsMapper', () => {
    it('should map context to a function', () => {
      const context = { Meteor: {} };
      const actions = {
        clients: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map clients.update to update', () => {
      const context = { Meteor: {} };
      const actions = {
        clients: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      props.update();

      expect(actions.clients.update.calledOnce).to.be.equal(true);
    });
    it('should map clients.clearErrors to clearErrors', () => {
      const context = { Meteor: {} };
      const actions = {
        clients: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      props.clearErrors();

      expect(actions.clients.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
