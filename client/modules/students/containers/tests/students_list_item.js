const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
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
    it('correctly maps context', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {students: {remove: spy(), update: spy()}};

      const map = depsMapper(context, actions);
      expect(map.context).to.be.a('function');
      expect(map.context()).to.deep.equal(context);
    });

    it('correctly maps remove', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {students: {remove: spy(), update: spy()}};

      const map = depsMapper(context, actions);
      expect(map.remove).to.be.a('function');
      map.remove();
      expect(actions.students.remove.calledOnce).to.be.equal(true);
    });

    it('correctly maps update', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {students: {remove: spy(), update: spy()}};

      const map = depsMapper(context, actions);
      expect(map.update).to.be.a('function');
      map.update();
      expect(actions.students.update.calledOnce).to.be.equal(true);
    });
  });
});
