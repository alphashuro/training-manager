const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../courses.js';

describe('courses.actions', () => {
  describe('create', () => {
    it('should reject if title is not given', () => {
      const LocalState = {set: spy()};

      actions.create({LocalState}, null, 'description');
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('COURSE_ERROR');
      expect(args[1]).to.match(/title/i);
      expect(args[1]).to.match(/required/);
    });

    it('should reject if description is not given', () => {
      const LocalState = {set: spy()};

      actions.create({LocalState}, 'title', null);
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('COURSE_ERROR');
      expect(args[1]).to.match(/description/i);
      expect(args[1]).to.match(/required/);
    });

    it('should set COURSE_ERROR to null', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy(), uuid: spy(), user: stub()};
      Meteor.user.returns({profile: {org: 'an org'}});

      actions.create({LocalState, Meteor}, 'title', 'description');
      const args = LocalState.set.args[0];
      expect(args).to.deep.equal([ 'COURSE_ERROR', null ]);
    });

    it(`should call Meteor.call
        with options { _id, title, description, org }
        and a cb function`, () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy(), uuid: stub(), user: stub()};
      Meteor.uuid.returns('id');
      Meteor.user.returns({profile: {org: 'org'}});

      actions.create({LocalState, Meteor}, 'title', 'description');
      const args = Meteor.call.args[0];
      expect(args[0]).to.be.equal('courses.create');
      expect(args[1]).to.deep.equal({
        _id: 'id',
        title: 'title',
        description: 'description',
        org: 'org'
      });
      expect(args[2]).to.be.a('function');
    });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set COURSE_ERROR with the error', () => {
          const LocalState = {set: spy()};
          const Meteor = {call: stub(), uuid: stub(), user: stub()};
          Meteor.uuid.returns('id');
          Meteor.user.returns({profile: {org: 'org'}});
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(2, err);

          actions.create({LocalState, Meteor}, 'title', 'description');
          const args = LocalState.set.args[1];

          expect(args).to.deep.equal(['COURSE_ERROR', err.reason]);
        });
      });
      it('should redirect to course details page', () => {
        const LocalState = {set: spy()};
        const FlowRouter = {go: spy()};
        const Meteor = {call: stub(), uuid: stub(), user: stub()};
        Meteor.uuid.returns('id');
        Meteor.user.returns({profile: {org: 'org'}});
        Meteor.call.callsArg(2);

        actions.create({LocalState, Meteor, FlowRouter}, 'title', 'description');
        const args = FlowRouter.go.args[0];

        expect(args[0]).to.be.equal(`/courses/id`);
      });
    });
  });
  describe('remove', () => {
    it('should reject if id is not given', () => {
      const LocalState = {set: spy()};

      actions.remove({LocalState}, null);

      expect(LocalState.set.args[0][0]).to.be.equal('COURSE_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/id/i);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should call Meteor call with the id', () => {
      const Meteor = {call: spy()};

      actions.remove({Meteor}, 'id');

      const args = Meteor.call.args[0];
      expect(args.slice(0, 2)).to.deep.equal([ 'courses.remove', 'id' ]);
      expect(args[2]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set COURSE_ERROR with the error reason', () => {
          const Meteor = {call: stub()};
          const LocalState = {set: spy()};
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(2, err);

          actions.remove({Meteor, LocalState}, 'id');
          const args = LocalState.set.args[0];
          expect(args).to.deep.equal([ 'COURSE_ERROR', err.reason ]);
        });
      });
    });
  });
  describe('update', () => {
    it('should reject if id is not given', () => {

    });
    it('should reject if options are not given', () => {

    });
    it(`should call Meteor.call with the id,
     and options { title, and description }
     and a cb`, () => {
      const Meteor = {call: spy()};

      actions.update({Meteor}, 'id', {
        title: 't-1',
        description: 'd-1'
      });
      const args = Meteor.call.args[0];

      expect(args[0]).to.be.equal('courses.update');
      expect(args[1]).to.be.equal('id');
      expect(args[2]).to.deep.equal({
        title: 't-1',
        description: 'd-1'
      });
      expect(args[3]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set COURSE_ERROR with the error reason', () => {
          const Meteor = {call: stub()};
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(3, err);
          const LocalState = {set: spy()};

          actions.update({Meteor, LocalState}, 'id', {
            title: 'title',
            description: 'description'
          });

          expect(LocalState.set.args[0]).to.deep.equal([
            'COURSE_ERROR', err.reason
          ]);
        });
      });
    });
  });
  describe('clearErrors', () => {
    it('should clear COURSE_ERROR', () => {
      const LocalState = {set: spy()};

      actions.clearErrors({LocalState});

      expect(LocalState.set.args[0]).to.deep.equal([ 'COURSE_ERROR', null ]);
    });
  });
});
