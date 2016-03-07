const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../new_client';

describe('clients.containers.new_client', () => {
  describe('composer', () => {
    it('should pass CLIENT_ERROR to onData', () => {
      const LocalState = {get: stub()};
      const error = 'oops';
      LocalState.get.returns(error);
      const onData = spy();

      const context = () => ({LocalState});

      composer({context}, onData);

      expect(LocalState.get.args[0]).to.deep.equal([ 'CLIENT_ERROR' ]);
      expect(onData.args[0][0]).to.be.equal(null);
      expect(onData.args[0][1]).to.deep.equal({error});
    });
  });
  describe('depsMapper', () => {
    it('should map context to a function', () => {
      const context = {Meteor: {}};
      const actions = {
        clients: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map clients.create to create', () => {
      const context = {Meteor: {}};
      const actions = {
        clients: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);
      props.create();
      expect(actions.clients.create.calledOnce).to.be.equal(true);
    });
    it('should map clients.clearErrors to clearErrors', () => {
      const context = {Meteor: {}};
      const actions = {
        clients: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);
      props.clearErrors();
      expect(actions.clients.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
