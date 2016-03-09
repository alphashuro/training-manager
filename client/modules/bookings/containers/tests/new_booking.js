const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer, depsMapper} from '../new_booking';

describe('bookings.containers.new_booking', () => {
  describe('composer', () => {
    const getCollections = (courses, facilitators) => ({
      Courses: {
        find: () => ({
          fetch: () => courses
        })
      },
      Facilitators: {
        find: () => ({
          fetch: () => facilitators
        })
      }
    });
    it('should subscribe to courses.list', () => {
      const Meteor = {
        subscribe: stub().returns({ready: () => false})};

      const context = () => ({Meteor});
      const onData = spy();
      composer({context}, onData);
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'courses.list'
      ]);
    });
    it('should call onData with courses and facilitators', () => {
      const LocalState = {get: () => null};
      const Meteor = {
        subscribe: () => ({ready: () => true})
      };
      const courses = [
        {_id:'c1'},
        {_id:'c2'}
      ];
      const facilitators = [
        {_id:'f1'},
        {_id:'c2'}
      ];
      const Collections = getCollections(courses, facilitators);
      const clearErrors = spy();

      const context = () => ({Meteor, Collections, LocalState});
      const onData = spy();
      composer({context}, onData);

      expect(onData.args[0][0]).to.deep.equal(null);
      expect(onData.args[0][1]).to.deep.equal({
        error: null,
        courses,
        facilitators
      });
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      bookings: {
        create: spy(),
        clearErrors: spy()
      }
    });
    it('should map context to a function', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map bookings.create to props.create', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.create();

      expect(actions.bookings.create.calledOnce)
      .to.be.equal(true);
    });
    it('should map bookings.clearErrors to props.clearErrors', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.clearErrors();

      expect(actions.bookings.clearErrors.calledOnce)
      .to.be.equal(true);
    });
  });
});
