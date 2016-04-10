const {describe, it} = global;
import {stub} from 'sinon';
import {expect} from 'chai';
import {composer} from '../dashboard';

describe('core.containers.dashboard', () => {
  	describe('composer', () => {
    	it('should subscribe to bookings.coming_up', () => {
      	const Meteor = {subscribe: stub()};
      	Meteor.subscribe.returns({ready: () => false});
        const context = () => ({Meteor});

      	composer({context});

      	expect(Meteor.subscribe.args[0]).to.deep.equal([
        	'bookings.coming_up'
      ]);
    });
  });
});
