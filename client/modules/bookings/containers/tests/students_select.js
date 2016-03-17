const {describe, it} = global;
import {expect} from 'chai';
import {assert, stub, spy} from 'sinon';
import {composer, depsMapper} from '../students_select';

describe('bookings.containers.students_select', () => {
  describe('composer', () => {
    const getCollections = ({
      clientId='clientId',
      students=[],
      booking={}
    }) => ({
      Students: {
        find: () => ({
          fetch: (clientId) => students
        })
      },
      Bookings: {
        findOne: (bookingId) => ({
          ...booking,
          _id: bookingId
        })
      },
    });
    it('should get selected client from LocalState', () => {
      const LocalState = {get: spy()};
      const context = () => ({
        LocalState
      });
      const onData = spy();

      composer({context}, onData);
      assert.calledWith(LocalState.get, 'SELECTED_CLIENT');
    });
    it('should get BOOKING_STUDENTS_ERROR from LocalState', () => {
      const LocalState = {get: spy()};
      const context = () => ({
        LocalState
      });
      const onData = spy();

      composer({context}, onData);

      assert.calledWith(LocalState.get, 'BOOKING_STUDENTS_ERROR');
    });
    describe('if there is a selected client', () => {
      it('should subscribe to clients.students', () => {
        const LocalState = {get: stub()};
        LocalState.get.onFirstCall().returns('clientId');
        const Meteor = {
          subscribe: stub().returns({ready: () => false})
        };

        const context = () => ({Meteor, LocalState});
        const onData = spy();
        composer({context}, onData);
        assert.calledWith(Meteor.subscribe, 'clients.students', 'clientId');
      });
      it('should subscribe to bookings.single', () => {
        const LocalState = {get: stub()};
        LocalState.get.onFirstCall().returns('clientId');
        const Meteor = {
          subscribe: stub().returns({ready: () => false})
        };

        const context = () => ({Meteor, LocalState});
        const onData = spy();
        composer({context}, onData);
        assert.calledWith(Meteor.subscribe, 'bookings.single');
      });
      describe('after subscription is ready', () => {
        it(`should call on Data with
          client's students,
          booking's students`, () => {
          const clientId = 'clientId';
          const students = [
            {_id:'1'},
            {_id:'2'}
          ];
          const booking = {studentIds : ['1', '2']};

          const LocalState = {get: stub()};
          LocalState.get.onFirstCall().returns(clientId);

          const Meteor = {
            subscribe: stub().returns({ready: () => true})
          };

          const Collections = getCollections({
            clientId,
            students,
            booking
          });

          const context = () => ({Meteor, LocalState, Collections});
          const onData = spy();
          composer({context}, onData);
          const args = onData.args[0];

          // (onData, null, { bookingStudents: booking.studentIds, students, error: null });
          expect(args[0]).to.be.equal(null);
          expect(args[1].error).to.be.equal(undefined);
          expect(args[1].students).to.deep.equal(students);
          expect(args[1].bookingStudents).to.deep.equal(booking.studentIds);
        });
        describe('if there is BOOKING_STUDENTS_ERROR', () => {
          it('should call onData with error', () => {
            const clientId = 'clientId';
            const students = [
              {_id:'1'},
              {_id:'2'}
            ];
            const booking = {studentIds : ['1', '2']};

            const LocalState = {get: stub()};
            LocalState.get.onFirstCall().returns(clientId);
            LocalState.get.onSecondCall().returns('oops');

            const Meteor = {
              subscribe: stub().returns({ready: () => true})
            };

            const Collections = getCollections({
              clientId,
              students,
              booking
            });

            const context = () => ({Meteor, LocalState, Collections});
            const onData = spy();
            composer({context}, onData);
            const args = onData.args[0];

            // (onData, null, { bookingStudents: booking.studentIds, students, error: null });
            expect(args[0]).to.be.equal(null);
            expect(args[1].error).to.be.equal('oops');
            expect(args[1].students).to.deep.equal(students);
            expect(args[1].bookingStudents).to.deep.equal(booking.studentIds);
          });
        });
      });
    });
    describe('if there is no selected client', () => {
      it('should call ondata with empty students array', () => {
        const clientId = null;

        const LocalState = {get: stub()};
        LocalState.get.onFirstCall().returns(clientId);

        const context = () => ({LocalState});
        const onData = spy();
        composer({context}, onData);
        const args = onData.args[0];

        expect(args[0]).to.be.equal(null);
        expect(args[1].error).to.be.equal(undefined);
        expect(args[1].students).to.deep.equal([]);
        expect(args[1].bookingStudents).to.deep.equal(undefined);
      });
      describe('if there is error', () => {
        it('should call onData with error', () => {
          const clientId = null;

          const LocalState = {get: stub()};
          LocalState.get.onFirstCall().returns(clientId);
          LocalState.get.onSecondCall().returns('oops');

          const context = () => ({LocalState});
          const onData = spy();
          composer({context}, onData);
          const args = onData.args[0];

          expect(args[0]).to.be.equal(null);
          expect(args[1].error).to.be.equal('oops');
          expect(args[1].students).to.deep.equal([]);
          expect(args[1].bookingStudents).to.deep.equal(undefined);
        });
      });
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      bookingStudents: {
        add: spy(),
        remove: spy(),
        clearErrors: spy()
      }
    });
    it('should map context to a function', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map bookingStudents.add to props.add', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.add();

      expect(actions.bookingStudents.add.calledOnce)
      .to.be.equal(true);
    });
    it('should map bookingStudents.remove to props.remove', () => {
      const context = { Meteor: {} };
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.remove();

      expect(actions.bookingStudents.remove.calledOnce)
      .to.be.equal(true);
    });
    it('should map bookingStudents.clearErrors to props.clearErrors', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.clearErrors();

      expect(actions.bookingStudents.clearErrors.calledOnce)
      .to.be.equal(true);
    });
  });
});
