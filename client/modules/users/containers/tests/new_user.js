const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {composer, depsMapper} from '../new_user';

describe('users.containers.new_user', () => {
  const getContext = () => ({
    LocalState: { get: stub() },
  });
  describe('composer', () => {
    it(`should get USER_ERROR from LocalState`, () => {
      const context = getContext();
      const onData = spy();

      composer({context: () => context}, onData);

      assert.calledOnce(context.LocalState.get);
      assert.calledWithExactly(context.LocalState.get, 'USER_ERROR');
    });
    describe(`if there is error`, () => {
      it('should pass error to onData', () => {
        const context = getContext();
        context.LocalState.get.returns('oops');
        const onData = spy();

        composer({context: () => context}, onData);

        const [ _, {error} ] = onData.args[0];
        expect(_).to.be.equal(null);
        expect(error).to.be.equal('oops');
      });
    });
  });
  describe('depsMapper', () => {
    const getActions = () => ({
      users: {
        create: spy(),
        clearErrors: spy()
      }
    });
    it('should map context to a function', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);

      expect(props.context()).to.deep.equal(context);
    });
    it('should map handleCreateUser to call users.create', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);
      const user = {
        name: 'name',
        email: 'email',
        phone: 'phone',
      };
      const event = {
        preventDefault: spy(),
        target: {
          name: {value: user.name},
          email: {value: user.email},
          phone: {value: user.phone},
        }
      };
      props.handleCreateUser(event);
      assert.calledOnce(actions.users.create);
      assert.calledWithExactly(actions.users.create, user);
    });
    it('should map users.clearErrors to clearErrors', () => {
      const context = {Meteor: {}};
      const actions = getActions();

      const props = depsMapper(context, actions);
      props.clearErrors();
      assert.calledOnce(actions.users.clearErrors);
    });
  });
});
