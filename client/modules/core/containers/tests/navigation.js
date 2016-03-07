const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer, depsMapper} from '../navigation';

describe('core.containers.navitation', () => {
  	describe('composer', () => {

    	it('should get the current user pass to onData', () => {
      	const Meteor = {
        	user: stub().returns({_id: 'x'})
      };
      	const FlowRouter = {
        	current: stub().returns({path: 'path'})
      };
      	const onData = spy();

      	const context = () => ({Meteor, FlowRouter});

      	composer({context}, onData);
      	const args = onData.args[0];
      	expect(args[1].user).to.deep.equal({
        	_id: 'x'
      });
    });

    	it('should get the current path and pass to onData', () => {
      	const FlowRouter = {
        	current: stub().returns({path: '/x'})
      };
      	const Meteor = {
        	user: stub().returns({_id: 'x'})
      };
      	const onData = spy();
      	const context = () => ({Meteor, FlowRouter});
      	composer({context}, onData);
      	const args = onData.args[0];
      	expect(args[1].path).to.be.equal('/x');
    });
  });
  	describe('depsMapper', () => {
    	it('should map context to a function', () => {
      	const context = {Meteor: {}};
      	const actions = {
        	auth: {
          	logout: spy()
        }
      };

      	const props = depsMapper(context, actions);
      	expect(props.context()).to.deep.equal(context);
    });
    	it('should map actions.auth.logout to onLogout', () => {
      	const context = {Meteor: {}};
      	const actions = {
        	auth: {
          	logout: spy()
        }
      };

      	const props = depsMapper(context, actions);
      	props.onLogout();
      	expect(actions.auth.logout.calledOnce).to.be.equal(true);
    });
  });
});
