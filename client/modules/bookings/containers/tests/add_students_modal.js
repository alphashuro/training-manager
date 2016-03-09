const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer, depsMapper} from '../add_students_modal';

describe('bookings.containers.add_students_modal', () => {
  describe('composer', () => {
    it('should get STUDENTS_MODAL state from LocalState', () => {
      const LocalState = {get: stub().returns(true)};
      const onData = spy();
      const context = () => ({LocalState});

      composer({context}, onData);

      expect(onData.args[0]).to.deep.equal([
        null, {show: true}
      ]);
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      bookingStudents: {
        closeModal: spy()
      }
    });
    it('should map context to a function', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map close to props', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.close();

      expect(actions.bookingStudents.closeModal.calledOnce)
      .to.be.equal(true);
    });
  });
});
