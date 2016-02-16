const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../facilitators_list_item';

describe('facilitators.containers.facilitators_list_item', () => {
  describe('composer', () => {
    it('should subscribe to facilitators.single', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const facilitatorId = 'id';

      const context = () => ({Meteor});

      composer({context, facilitatorId});

      expect(Meteor.subscribe.calledOnce).to.be.equal(true);
      const args = Meteor.subscribe.args[0];
      expect(args[0]).to.be.equal('facilitators.single');
      expect(args[1]).to.be.equal(facilitatorId);
    });
    describe('after subscribing', () => {
      it('should call onData with the facilitator\'s details', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const Collections = {Users: { findOne: stub() }};
        const facilitator = {
          _id: '1',
          emails: [
            { address: 'email' }
          ],
          profile: {
            name: 'name',
            phone: 'phone'
          }
        };
        Collections.Users.findOne.returns(facilitator);
        const facilitatorId = 'id';

        const context = () => ({Meteor, Collections});
        const onData = spy();

        composer({context, facilitatorId}, onData);
        const args = onData.args[0];

        expect(onData.calledOnce).to.be.equal(true);
        expect(args[0]).to.be.equal(null);
        expect(args[1]).to.deep.equal({_id: '1', email: 'email', ...facilitator.profile});
      });
    });
  });
  describe('depsMapper', () => {
    it('should correctly map context', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {
        facilitators: {
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
        facilitators: {
          remove: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.onRemove).to.be.a('function');
      props.onRemove();
      expect(actions.facilitators.remove.calledOnce).to.be.equal(true);
    });
    it('should correctly map onInvite', () => {
      const context = {};
      const actions = {
        facilitators: {
          invite: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.onInvite).to.be.a('function');
      props.onInvite();
      expect(actions.facilitators.invite.calledOnce).to.be.equal(true);
    });
  });
});
