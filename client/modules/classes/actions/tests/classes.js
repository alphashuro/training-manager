const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../classes.js';

describe('classes.actions', () => {
  describe('create', () => {
    it('should reject if courseId is not given', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: spy(), uuid: spy()};

      actions.create({Meteor, LocalState}, null);
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('CLASSES_ERROR');
      expect(args[1]).to.match(/courseid/i);
      expect(args[1]).to.match(/required/);
    });
    it('should set CLASSES_ERROR to null', () => {
      const Meteor = {call: spy(), uuid: spy()};
      const LocalState = {set: spy()};

      actions.create({LocalState, Meteor}, 'id');
      const args = LocalState.set.args[0];
      expect(args).to.deep.equal([ 'CLASSES_ERROR', null ]);
    });
    it(`should call Meteor.call
      with options { _id, name, phone, email }
      and a cb function`, () => {
      const Meteor = {call: spy(), uuid: stub()};
      const LocalState = {set: spy()};
      Meteor.uuid.returns('id');

      actions.create({LocalState, Meteor}, 'id');
      const args = Meteor.call.args[0];
      expect(args[0]).to.be.equal('classes.create');
      expect(args[1]).to.deep.equal({
        _id: 'id',
        title: '',
        description: '',
        duration: 0,
        price: 0,
        courseId: 'id'
      });
      expect(args[2]).to.be.a('function');
    });

    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set CLASSES_ERROR with the error', () => {
          const LocalState = {set: spy()};
          const Meteor = {call: stub(), uuid: stub()};
          Meteor.uuid.returns('id');
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(2, err);

          actions.create({LocalState, Meteor}, 'name');
          const args = LocalState.set.args[1];

          expect(args).to.deep.equal(['CLASSES_ERROR', err.reason]);
        });
      });
    });


  });
  describe('remove', () => {
    it('should reject if id is not given', () => {
      const LocalState = {set: spy()};

      actions.remove({LocalState}, null);

      expect(LocalState.set.args[0][0]).to.be.equal('CLASSES_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/id/i);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should call Meteor.call with the id', () => {
      const Meteor = {call: spy()};

      actions.remove({Meteor}, 'id');

      const args = Meteor.call.args[0];
      expect(args.slice(0, 2)).to.deep.equal([ 'classes.remove', 'id' ]);
      expect(args[2]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set CLASSES_ERROR with the error reason', () => {
          const Meteor = {call: stub()};
          const LocalState = {set: spy()};
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(2, err);

          actions.remove({Meteor, LocalState}, 'id');
          const args = LocalState.set.args[0];
          expect(args).to.deep.equal([ 'CLASSES_ERROR', err.reason ]);
        });
      });
    });
  });
  describe('update', () => {
    it('should reject if id is not given', () => {
      const LocalState = {set: spy()};

      actions.update({LocalState}, null, {});
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('CLASSES_ERROR');
      expect(args[1]).to.match(/id/i);
      expect(args[1]).to.match(/required/);
    });
    it('should reject if options are not given', () => {
      const LocalState = {set: spy()};

      actions.update({LocalState}, 'id', {});
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('CLASSES_ERROR');
      expect(args[1]).to.match(/title/i);
      expect(args[1]).to.match(/description/i);
      expect(args[1]).to.match(/duration/i);
      expect(args[1]).to.match(/price/);
      expect(args[1]).to.match(/required/);
    });
    it(`should call Meteor.call with the id,
      and options { name, phone, email }
      and a cb`, () => {
      const Meteor = {call: spy()};

      actions.update({Meteor}, 'id', {
        title: 'title',
        description: 'description',
        price: 10,
        duration: 10
      });
      const args = Meteor.call.args[0];

      expect(args[0]).to.be.equal('classes.update');
      expect(args[1]).to.be.equal('id');
      expect(args[2]).to.deep.equal({
        title: 'title',
        description: 'description',
        price: 10,
        duration: 10
      });
      expect(args[3]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      describe('if there is error', () => {
        it('should set CLASSES_ERROR with the error reason', () => {
          const Meteor = {call: stub()};
          const err = { reason: 'oops' };
          Meteor.call.callsArgWith(3, err);
          const LocalState = {set: spy()};

          actions.update({Meteor, LocalState}, 'id', {
            title: 'title',
            description: 'description',
            price: 10,
            duration: 10
          });

          expect(LocalState.set.args[0]).to.deep.equal([
            'CLASSES_ERROR', err.reason
          ]);
        });
      });
    });
  });
  describe('clearErrors', () => {
    it('should clear CLASSES_ERROR', () => {
      const LocalState = {set: spy()};

      actions.clearErrors({LocalState});

      expect(LocalState.set.args[0]).to.deep.equal([ 'CLASSES_ERROR', null ]);
    });
  });
});
