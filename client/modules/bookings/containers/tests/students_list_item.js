const {describe, it} = global;
import {expect} from 'chai';
import {assert, stub, spy} from 'sinon';
import {composer, depsMapper} from '../students_list_item';

describe('bookings.containers.students_list_item', () => {
  const student = {
    _id: '1',
    clientId: 'c1',
    client: () => ({
      _id: 'c1'
    })
  };
  const getCollections = () => ({
    Students: {
      findOne: () => student
    }
  });
  describe('composer', () => {
    it('should subscribe to students.single', () => {
      const Meteor = {
        subscribe: stub().returns({ready: () => false})
      };

      composer({context: () => ({Meteor}), studentId: 'id'}, () => {});

      assert.calledWithExactly(Meteor.subscribe, 'students.single', 'id');
    });
    describe('when subscription is ready', () => {
      it('should call onData with the retrieved student and client', () => {
        const Meteor = {
          subscribe: stub().returns({ready: () => true})
        };
        const Collections = getCollections();
        const onData = spy();

        composer({context: () => ({Meteor, Collections}), studentId: 'id'}, onData);

        const args = onData.args[0];

        expect(args[0]).to.be.equal(null);
        expect(args[1]).to.deep.equal({
          ...student,
          client: {
            _id: 'c1'
          }
        });
      });
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      bookingStudents: {
        remove: spy()
      }
    });
    it('should correctly map context', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map actions.bookingStudents.remove to remove', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.remove();

      expect(actions.bookingStudents.remove.calledOnce).to.be.equal(true);
    });
  });
});
