const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../new_course';

describe('courses.containers.new_course', () => {
  describe('composer', () => {
    it('should pass COURSE_ERROR to onData', () => {
      const LocalState = {get: stub()};
      const error = 'oops';
      LocalState.get.returns(error);
      const onData = spy();

      const context = () => ({LocalState});

      composer({context}, onData);

      expect(LocalState.get.args[0]).to.deep.equal([ 'COURSE_ERROR' ]);
      expect(onData.args[0][0]).to.be.equal(null);
      expect(onData.args[0][1]).to.deep.equal({error});
    });
  });
  describe('depsMapper', () => {
    it('should map context to a function', () => {
      const context = {Meteor: {}};
      const actions = {
        courses: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map courses.create to create', () => {
      const context = {Meteor: {}};
      const actions = {
        courses: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);
      props.create();
      expect(actions.courses.create.calledOnce).to.be.equal(true);
    });
    it('should map courses.clearErrors to clearErrors', () => {
      const context = {Meteor: {}};
      const actions = {
        courses: {
          create: spy(),
          clearErrors: spy()
        }
      };

      const props = depsMapper(context, actions);
      props.clearErrors();
      expect(actions.courses.clearErrors.calledOnce).to.be.equal(true);
    });
  });
});
