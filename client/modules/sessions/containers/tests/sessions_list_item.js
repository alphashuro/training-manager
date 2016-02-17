const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../sessions_list_item';

describe('sessions.containers.sessions_list_item', () => {
  describe('composer', () => {
    it('should subscribe to sessions.single with the sessionId', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const sessionId = '123';

      const context = () => ({Meteor});
      const onData = spy();

      composer({context, sessionId}, onData);

      expect(Meteor.subscribe.calledOnce).to.be.equal(true);
      const args = Meteor.subscribe.args[0];
      expect(args).to.deep.equal([
        'sessions.single', sessionId
      ]);
    });
    describe('when subscription is ready', () => {
      it('should call onData with the fetched session and class', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const sessionId = '123';
        const Collections = {
          Sessions: { findOne: stub()},
          Classes: { findOne: stub()}
        };
        const session = {
          _id: '123',
          date: new Date(),
          classId: '123'
        };
        const _class = {
          _id: '123',
          title: 'x',
          description: 'y'
        };
        Collections.Sessions.findOne.returns(session);
        Collections.Classes.findOne.returns(_class);

        const context = () => ({Meteor, Collections});
        const onData = spy();

        composer({context, sessionId}, onData);

        expect(onData.calledOnce).to.be.equal(true);
        const args = onData.args[0];
        expect(args).to.deep.equal([
          null,
          { ...session, class: _class }
        ]);
      });
    });
  });
  describe('depsMapper', () => {
    it('should map context to a function', () => {
      const context = {Meteor: {}};
      const actions = {sessions: {update: spy()}};

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map sessions.update to update', () => {
      const context = {};
      const actions = {sessions: {update: spy()}};

      const props = depsMapper(context, actions);
      props.update();

      expect(actions.sessions.update.calledOnce).to.be.equal(true);
    });
  });
});
