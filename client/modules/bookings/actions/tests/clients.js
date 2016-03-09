const {describe, it} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import actions from '../clients.js';

describe('bookings.actions.clients', () => {
  describe('select', () => {
    it('should set selected client on LocalState', () => {
      const LocalState = {set: spy()};

      actions.select({LocalState}, 'id');

      expect(LocalState.set.calledOnce).to.be.equal(true);
      expect(LocalState.set.args[0]).to.deep.equal([
        'SELECTED_CLIENT',
        'id'
      ]);
    });
  });
});
