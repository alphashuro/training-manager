const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {composer, depsMapper} from '../new_facilitator';

describe('facilitators.containers.new_facilitator', () => {
  describe('composer', () => {
    it('should pass FACILITATOR_ERROR to onData', () => {
      const LocalState = {get: stub()};
      const error = 'oops';
      LocalState.get.returns(error);
      const onData = spy();

      const context = () => ({LocalState});

      composer({context}, onData);

      expect(LocalState.get.args[0]).to.deep.equal([ 'FACILITATOR_ERROR' ]);
      expect(onData.args[0][0]).to.be.equal(null);
      expect(onData.args[0][1]).to.deep.equal({error});
    });
  });
  describe('depsMapper', () => {
    it('should map context to a function', () => {
      const context = {Meteor: {}};
      const actions = {
        facilitators: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map handleCreateFacilitator to call facilitators.create', () => {
      const context = {Meteor: {}};
      const actions = {
        facilitators: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);
      const facilitator = {
        name: 'name',
        email: 'email',
        phone: 'phone',
      };
      const event = {
        preventDefault: spy(),
        target: {
          name: {value: facilitator.name},
          email: {value: facilitator.email},
          phone: {value: facilitator.phone},
        }
      };
      props.handleCreateFacilitator(event);
      assert.calledOnce(actions.facilitators.create);
      assert.calledWithExactly(actions.facilitators.create, facilitator);
    });
    it('should map facilitators.clearErrors to clearErrors', () => {
      const context = {Meteor: {}};
      const actions = {
        facilitators: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);
      props.clearErrors();
      expect(actions.facilitators.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
