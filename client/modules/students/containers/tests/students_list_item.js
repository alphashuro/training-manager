const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy, assert} from 'sinon';
import {composer, depsMapper} from '../students_list_item';

describe('students.containers.student_list_item', () => {
  describe('composer', () => {
    it('should subscribe to students.single', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const Collections = { Students: {findOne: stub()} };

      const context = () => ({Meteor, Collections});
      const studentId = '1';

      composer({context, studentId});

      expect(Meteor.subscribe.calledOnce).to.be.equal(true);
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'students.single', studentId
      ]);
    });
    describe('after subscribing', () => {
      it('should call onData the student from Students Collection', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const Collections = { Students: {findOne: stub()} };
        const student = {
          _id: '1',
          name: 'name',
          phone: 'phone',
          email: 'email'
        };
        Collections.Students.findOne.returns(student);

        const context = () => ({Meteor, Collections});
        const studentId = '1';
        const onData = spy();

        composer({context, studentId}, onData);

        expect(onData.calledOnce).to.be.equal(true);
        expect(onData.args[0]).to.deep.equal([
          null,
          {...student}
        ]);
      });
    });
  });
  describe('depsMapper', () => {
    const getContext = () => ({Meteor: {}, Collections: {}});
    const getActions = () => ({students: {remove: spy(), update: spy()}});
    it('correctly maps context', () => {
      const context = getContext();
      const actions = getActions();

      const props = depsMapper(context, actions);
      expect(props.context).to.be.a('function');
      expect(props.context()).to.deep.equal(context);
    });

    it(`should map handleRemove to call students.remove with given _id`, () => {
      const context = getContext();
      const actions = getActions();

      const props = depsMapper(context, actions);
      expect(props.handleRemove).to.be.a('function');
      props.handleRemove('id');
      assert.calledWithExactly(actions.students.remove, 'id');
    });

    it('should map handleUpdate to call students.update with values from event target', () => {
      const context = getContext();
      const actions = getActions();

      const props = depsMapper(context, actions);
      expect(props.handleUpdate).to.be.a('function');
      const student = {
        name: 'name',
        phone: 'phone',
        email: 'email',
        ID: 'ID',
      };
      const event = {
        preventDefault: spy(),
        target: {
          name: {value: student.name},
          phone: {value: student.phone},
          email: {value: student.email},
          ID: {value: student.ID},
        }
      };
      props.handleUpdate('id', event);
      assert.calledWithExactly(actions.students.update, 'id', student);
    });
  });
});
