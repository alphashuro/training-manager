const {describe, it} = global;
import {stub} from 'sinon';
import {expect} from 'chai';
import {composer} from '../dashboard';

describe('core.containers.dashboard', () => {
  	describe('composer', () => {
    	it('should subscribe to bookings.list', () => {
      	const Meteor = {subscribe: stub()};
      	Meteor.subscribe.returns({ready: () => false});

      	composer({Meteor});

      	expect(Meteor.subscribe.args[0]).to.deep.equal([
        	'bookings.list'
      ]);
    });
  });
});
