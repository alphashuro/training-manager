const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer} from '../main_layout';

describe('core.containers.main_layout', () => {
  	describe('composer', () => {
    	it('should call onData with {} if there is a user logged in', () => {
      	const Meteor = {
        	user: stub().returns({}),
        	loggingIn: stub().returns(false)
      };

      	const context = () => ({Meteor});
      	const onData = spy();

      	composer({context}, onData);

      	expect(onData.args[0][1]).to.deep.equal({});
    });
    	it('should call onData with {} if user is loggingIn', () => {
      	const Meteor = {
        	user: stub().returns(null),
        	loggingIn: stub().returns(true)
      };

      	const context = () => ({Meteor});
      	const onData = spy();

      	composer({context}, onData);

      	expect(onData.args[0][1]).to.deep.equal({});
    });
    	it('should redirect to /login if there is no user', () => {
      	const Meteor = {
        	user: stub().returns(null),
        	loggingIn: stub().returns(false)
      };
      	const FlowRouter = {
        	go: spy()
      };

      	const context = () => ({Meteor, FlowRouter});
      	const onData = spy();

      	composer({context}, onData);

      	expect(FlowRouter.go.args[0][0]).to.be.equal('/login');
    });
  });
});
