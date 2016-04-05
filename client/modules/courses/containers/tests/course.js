const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {composer, depsMapper} from '../course.js';

describe('courses.containers.course', () => {
  describe('composer', () => {
    it('should subscribe to courses.single with given courseId', () => {
      const Meteor = { subscribe: stub().returns({
        ready: () => false,
      }) };
      const courseId = 'id';

      const context = () => ({Meteor});

      composer({context, courseId});

      assert.calledWithExactly(Meteor.subscribe, 'courses.single', courseId);
    });
    describe('when subscription is ready', () => {
      it('should find and pass a course on to onData', () => {
        const Meteor = { subscribe: stub().returns({
          ready: () => true,
        }) };
        const courseId = '123';
        const course = {
          _id: '123',
          name: 'xyz'
        };
        const Collections = {
          Courses: {
            findOne: stub()
          }
        };
        Collections.Courses.findOne.returns(course);
        const LocalState = {get: spy()};

        const context = () => ({Meteor, Collections, LocalState});
        const onData = spy();

        composer({context, courseId}, onData);

        expect(Collections.Courses.findOne.args[0][0]).to.be.equal(courseId);
        const args = onData.args[0];
        expect(args[0]).to.be.equal(null);
        expect(args[1].course).to.deep.equal(course);
        expect(args[1].error).to.be.equal(undefined);
      });
      describe('if there is COURSE_ERROR', () => {
        it('should pass the error on to onData', () => {
          const Meteor = { subscribe: stub().returns({
            ready: () => true,
          }) };
          const courseId = '123';
          const course = {
            _id: '123',
            name: 'xyz'
          };
          const Collections = {
            Courses: {
              findOne: stub()
            }
          };
          Collections.Courses.findOne.returns(course);
          const LocalState = {get: stub()};
          const err = 'oops';
          LocalState.get.returns(err);

          const context = () => ({Meteor, Collections, LocalState});
          const onData = spy();

          composer({context, courseId}, onData);
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
        courses: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('handleUpdate should call courses.update with id, title and description from event target', () => {
      const context = { Meteor: {} };
      const actions = {
        courses: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);
      const event = {
        preventDefault: spy(),
        target: {
          title: {value: 'title'},
          description: {value: 'description'},
        },
      };
      props.handleUpdate('id', event);

      assert.calledWithExactly(actions.courses.update, 'id', {title: 'title', description: 'description'});
    });
    it('should map courses.clearErrors to clearErrors', () => {
      const context = { Meteor: {} };
      const actions = {
        courses: {
          update: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      props.clearErrors();

      expect(actions.courses.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
