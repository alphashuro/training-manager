const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';

import actions from '../auth';

describe('users.actions.auth', () => {
  describe('login', () => {
    it('should reject if email is not given', () => {
      const LocalState = {set: spy()};

      actions.login({LocalState}, null, 'password');

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0][0]).to.be.equal('LOGIN_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/[Ee]mail/);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should reject if password is not given', () => {
      const LocalState = {set: spy()};

      actions.login({LocalState}, 'email', null);

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0][0]).to.be.equal('LOGIN_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/[Pp]assword/);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should call Meteor.loginWithPassword with email and password', () => {
      const Meteor = { loginWithPassword: spy() };

      actions.login({Meteor}, 'email', 'password');

      expect(Meteor.loginWithPassword.calledOnce).to.be.equal(true);
      expect(Meteor.loginWithPassword.args[0].slice(0,2)).to.deep.equal([
        'email', 'password'
      ]);
      expect(Meteor.loginWithPassword.args[0][2]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      it('should redirect user to /', () => {
        const Meteor = {loginWithPassword: stub()};
        const FlowRouter = {go: spy()};
        Meteor.loginWithPassword.callsArg(2);

        actions.login({Meteor, FlowRouter}, 'email', 'password');

        expect(FlowRouter.go.calledOnce).to.be.equal(true);
        expect(FlowRouter.go.args[0][0]).to.be.equal('/');
      });
      describe('if there is error', () => {
        it('should set LOGIN_ERROR with the error', () => {
          const Meteor = {loginWithPassword: stub()};
          const LocalState = {set: spy()};
          const FlowRouter = {go: spy()};
          const err = {reason: 'oops'};
          Meteor.loginWithPassword.callsArgWith(2, err);

          actions.login({Meteor, FlowRouter, LocalState}, 'email', 'password');

          expect(LocalState.set.calledOnce).to.be.equal(true);
          expect(LocalState.set.args[0]).to.deep.equal([
            'LOGIN_ERROR', err.reason
          ]);
        });
      });
    });
  });
  describe('signup', () => {
    it('should reject if email is not given', () => {
      const LocalState = {set: spy()};

      actions.signup({LocalState}, null, 'password');

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0][0]).to.be.equal('SIGNUP_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/[Ee]mail/);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should reject if password is not given', () => {
      const LocalState = {set: spy()};

      actions.signup({LocalState}, 'email', null);

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0][0]).to.be.equal('SIGNUP_ERROR');
      expect(LocalState.set.args[0][1]).to.match(/[Pp]assword/);
      expect(LocalState.set.args[0][1]).to.match(/required/);
    });
    it('should call Meteor.call with email, password', () => {
      const Meteor = { call: spy() };

      actions.signup({Meteor}, 'email', 'password');

      expect(Meteor.call.calledOnce).to.be.equal(true);
      expect(Meteor.call.args[0].slice(0,3)).to.deep.equal([
        'users.signup', 'email', 'password'
      ]);
      expect(Meteor.call.args[0][3]).to.be.a('function');
    });
    describe('after Meteor.call', () => {
      it('should redirect user to /login', () => {
        const Meteor = {call: stub()};
        const FlowRouter = {go: spy()};
        Meteor.call.callsArg(3);

        actions.signup({Meteor, FlowRouter}, 'email', 'password');

        expect(FlowRouter.go.calledOnce).to.be.equal(true);
        expect(FlowRouter.go.args[0][0]).to.be.equal('/login');
      });
      describe('if there is error', () => {
        it('should set SIGNUP_ERROR with the error', () => {
          const Meteor = {call: stub()};
          const LocalState = {set: spy()};
          const FlowRouter = {go: spy()};
          const err = {reason: 'oops'};
          Meteor.call.callsArgWith(3, err);

          actions.signup({Meteor, FlowRouter, LocalState}, 'email', 'password');

          expect(LocalState.set.calledOnce).to.be.equal(true);
          expect(LocalState.set.args[0]).to.deep.equal([
            'SIGNUP_ERROR', err.reason
          ]);
        });
      });
    });
  });
  describe('logout', () => {
    it('calls Meteor.logout', () => {
      const Meteor = {logout: spy()};

      actions.logout({Meteor});

      expect(Meteor.logout.calledOnce).to.be.equal(true);
      expect(Meteor.logout.args[0][0]).to.be.a('function');
    });
    it('sets LOGOUT_ERROR if there is error', () => {
      const Meteor = {logout: stub()};
      const err = {reason: 'oops'};
      Meteor.logout.callsArgWith(0, err);
      const LocalState = {set: spy()};

      actions.logout({Meteor, LocalState});

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0]).to.deep.equal([
        'LOGOUT_ERROR', err.reason
      ]);
    });
  });
  describe('clearLoginErrors', () => {
    it('clears LOGIN_ERROR', () => {
      const LocalState = {set: spy()};

      actions.clearLoginErrors({LocalState});

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0]).to.deep.equal([
        'LOGIN_ERROR', null
      ]);
    });
  });
  describe('clearSignupErrors', () => {
    it('clears SIGNUP_ERROR', () => {
      const LocalState = {set: spy()};

      actions.clearSignupErrors({LocalState});

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0]).to.deep.equal([
        'SIGNUP_ERROR', null
      ]);
    });
  });
  describe('clearLogoutErrors', () => {
    it('clears LOGOUT_ERROR', () => {
      const LocalState = {set: spy()};

      actions.clearLogoutErrors({LocalState});

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0]).to.deep.equal([
        'LOGOUT_ERROR', null
      ]);
    });
  });
});
