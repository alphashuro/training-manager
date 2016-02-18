const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../facilitator.js';

describe('facilitators.containers.facilitator', () => {
  describe('composer', () => {
    it('should subscribe to facilitators.single with given facilitatorId', () => {
      const Meteor = { subscribe: stub() };
      Meteor.subscribe.returns({ ready: () => false});
      const facilitatorId = '123';

      const context = () => ({Meteor});

      composer({context, facilitatorId});

      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'facilitators.single', facilitatorId
      ]);
    });
    describe('when subscription is ready', () => {
      it('should find and pass a facilitator on to onData', () => {
        const Meteor = { subscribe: stub() };
        Meteor.subscribe.returns({ ready: () => true});
        const facilitatorId = '123';
        const facilitator = {
          _id: '123',
          name: 'xyz'
        };
        const Collections = {
          Users: {
            findOne: stub()
          }
        };
        Collections.Users.findOne.returns(facilitator);
        const LocalState = {get: spy()};

        const context = () => ({Meteor, Collections, LocalState});
        const onData = spy();

        composer({context, facilitatorId}, onData);

        expect(Collections.Users.findOne.args[0][0]).to.be.equal(facilitatorId);
        const args = onData.args[0];
        expect(args[0]).to.be.equal(null);
        expect(args[1].facilitator).to.deep.equal(facilitator);
        expect(args[1].error).to.be.equal(undefined);
      });
      describe('if there is FACILITATOR_ERROR', () => {
        it('should pass the error on to onData', () => {
          const Meteor = { subscribe: stub() };
          Meteor.subscribe.returns({ ready: () => true});
          const facilitatorId = '123';
          const facilitator = {
            _id: '123',
            name: 'xyz'
          };
          const Collections = {
            Users: {
              findOne: stub()
            }
          };
          Collections.Users.findOne.returns(facilitator);
          const LocalState = {get: stub()};
          const err = 'oops';
          LocalState.get.returns(err);

          const context = () => ({Meteor, Collections, LocalState});
          const onData = spy();

          composer({context, facilitatorId}, onData);
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
        facilitators: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map facilitators.update to update', () => {
      const context = { Meteor: {} };
      const actions = {
        facilitators: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      props.update();

      expect(actions.facilitators.update.calledOnce).to.be.equal(true);
    });
    it('should map facilitators.clearErrors to clearErrors', () => {
      const context = { Meteor: {} };
      const actions = {
        facilitators: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      props.clearErrors();

      expect(actions.facilitators.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
