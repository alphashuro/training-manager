const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../courses_list_item';

describe('courses.containers.courses_list_item', () => {
  describe('composer', () => {
    it('should subscribe to courses.single', () => {
      const Meteor = {subscribe: stub()};
      Meteor.subscribe.returns({ready: () => false});
      const courseId = 'id';

      const context = () => ({Meteor});

      composer({context, courseId});

      expect(Meteor.subscribe.calledOnce).to.be.equal(true);
      const args = Meteor.subscribe.args[0];
      expect(args[0]).to.be.equal('courses.single');
      expect(args[1]).to.be.equal(courseId);
    });
    describe('after subscribing', () => {
      it('should call onData with the course\'s details', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const Collections = {Courses: { findOne: stub() }};
        const course = {
          _id: 'id',
          title: 't-1',
          description: 'd-1'
        };
        Collections.Courses.findOne.returns(course);
        const courseId = 'id';

        const context = () => ({Meteor, Collections});
        const onData = spy();

        composer({context, courseId}, onData);
        const args = onData.args[0];

        expect(onData.calledOnce).to.be.equal(true);
        expect(args[0]).to.be.equal(null);
        expect(args[1]).to.deep.equal(course);
      });
    });
  });
  describe('depsMapper', () => {
    it('should correctly map context', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {
        courses: {
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
        courses: {
          remove: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.onRemove).to.be.a('function');
      props.onRemove();
      expect(actions.courses.remove.calledOnce).to.be.equal(true);
    });
  });
});
