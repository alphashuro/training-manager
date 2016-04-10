const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer} from '../students_list';
import {depsMapper} from '../students_list';

describe('students.containers.students_list', () => {
  describe('composer', () => {
    it('should subscribe to client.students.ids', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const clientId = 'id';
      const context = () => ({Meteor});

      composer({context, clientId});
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'client.students.ids', clientId
      ]);
    });

    describe('after subscribed', () => {
      it('should fetch ids from client\'s students and pass on to onData', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const LocalState = {get: spy()};

        const clientId = '1';

        const students = [ {_id: '1'}, {_id: '2'} ];
        const Collections = {Students: {find: stub()}};
        Collections.Students.find.returns({fetch: () => students});

        const context = () => ({Meteor, Collections, LocalState});
        const onData = spy();

        composer({context, clientId, LocalState}, onData);
        const args = onData.args[0];
        expect(args[0]).to.be.equal(null);
        expect(args[1].studentIds).to.deep.equal([ '1', '2' ]);
        expect(args[1].error).to.be.equal(undefined);
      });

      it('should fetch error from LocalState', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const LocalState = {get: spy()};

        const clientId = '1';

        const students = [ {_id: '1'}, {_id: '2'} ];
        const Collections = {Students: {find: stub()}};
        Collections.Students.find.returns({fetch: () => students});

        const context = () => ({Meteor, Collections, LocalState});
        const onData = spy();

        composer({context, clientId, LocalState}, onData);
        expect(LocalState.get.calledOnce).to.be.equal(true);
      });

      describe('if there is an error', () => {
        it('should pass error on to onData', () => {
          const Meteor = {subscribe: stub()};
          Meteor.subscribe.returns({ready: () => true});
          const LocalState = {get: stub()};
          const err = 'oops';
          LocalState.get.returns(err);

          const clientId = '1';

          const students = [ {_id: '1'}, {_id: '2'} ];
          const Collections = {Students: {find: stub()}};
          Collections.Students.find.returns({fetch: () => students});

          const context = () => ({Meteor, Collections, LocalState});
          const onData = spy();

          composer({context, clientId, LocalState}, onData);
          const args = onData.args[0];
          expect(args[0]).to.be.equal(null);
          expect(args[1].studentIds).to.deep.equal([ '1', '2' ]);
          expect(args[1].error).to.be.equal(err);
        });
      });
    });
  });

  describe('depsMapper', () => {
    it('correctly maps context', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {students: {create: spy(), clearErrors: spy()}};

      const map = depsMapper(context, actions);
      expect(map.context).to.be.a('function');
      expect(map.context()).to.deep.equal(context);
    });

    it('correctly maps create', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {students: {create: spy(), clearErrors: spy()}};

      const map = depsMapper(context, actions);
      expect(map.create).to.be.a('function');
      map.create();
      expect(actions.students.create.calledOnce).to.be.equal(true);
    });

    it('correctly maps clearErrors', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {students: {create: spy(), clearErrors: spy()}};

      const map = depsMapper(context, actions);
      expect(map.clearErrors).to.be.a('function');
      map.clearErrors();
      expect(actions.students.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
