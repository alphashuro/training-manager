const {describe, it} = global;
import {stub, spy} from 'sinon';
import {expect} from 'chai';
import {composer, depsMapper} from '../classes_list';

describe('classes.containers.classes_list', () => {
  describe('composer', () => {
    it('subscribes to classes.ids', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const courseId = 'id';

      const context = () => ({Meteor});
      composer({context, courseId});
      const args = Meteor.subscribe.args[0];

      expect(args[0]).to.be.equal('classes.ids');
      expect(args[1]).to.be.equal('id');
    });
    describe('after subscribing', () => {
      it('gets class ids and passes them on to onData', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const Collections = {Classes: {find: stub()}};
        const cursor = {fetch: stub()};
        Collections.Classes.find.returns(cursor);
        const classes = [
          {_id: '1'},
          {_id: '2'}
        ];
        cursor.fetch.returns(classes);
        const LocalState = {get: spy()};
        const onData = spy();

        const context = () => ({Meteor, Collections, LocalState});
        composer({context}, onData);
        const args = onData.args[0];

        expect(args[0]).to.be.equal(null);
        expect(args[1].classesIds).to.deep.equal(['1', '2']);
        expect(args[1].error).to.be.equal(undefined);
      });
      describe('if there is error', () => {
        it('passes error on to onData', () => {
          const Meteor = {subscribe: stub()};
          Meteor.subscribe.returns({ready: () => true});
          const Collections = {Classes: {find: stub()}};
          const cursor = {fetch: stub()};
          Collections.Classes.find.returns(cursor);
          const classes = [];
          cursor.fetch.returns(classes);
          const LocalState = {get: stub()};
          LocalState.get.returns('oops');
          const onData = spy();

          const context = () => ({Meteor, Collections, LocalState});
          composer({context}, onData);
          const args = onData.args[0];

          expect(args[1].error).to.be.equal('oops');
        });
      });
    });
  });

  describe('depsMapper', () => {
    const getActions = () => ({
        classes: {
          create: spy(),
          clearErrors: spy()
        }
      });
    it('should correctly map context', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context).to.be.a('function');
      expect(props.context()).to.deep.equal(context);
    });
    it('should correctly map handleAddClass', () => {
      const context = {};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.handleAddClass).to.be.a('function');
      props.handleAddClass();
      expect(actions.classes.create.calledOnce).to.be.equal(true);
    });
    it('should correctly map clearErrors', () => {
      const context = {};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.clearErrors).to.be.a('function');
      props.clearErrors();
      expect(actions.classes.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
