const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import FacilitatorsListItem from '../facilitators_list_item.jsx';
import React from 'react';

describe('facilitators.components.facilitators_list_item', () => {
  it('should have a link to the facilitator\'s detail page', () => {
    const props = {
      _id: '1',
      name: 'Alpha Shuro',
      phone: '073 790 7955',
      email: 'alpha@aepit.co.za',

      onInvite: spy(),
      onRemove: spy()
    };

    const el = shallow(<FacilitatorsListItem {...props} />);
    const link = el.find(`[href='/facilitators/${props._id}']`);
    expect(link.length).to.be.equal(1);
  });

  it('should call remove when .remove is clicked', () => {
    const props = {
      _id: '1',
      name: 'Alpha Shuro',
      phone: '073 790 7955',
      email: 'alpha@aepit.co.za',

      onInvite: spy(),
      onRemove: spy()
    };

    const el = shallow(<FacilitatorsListItem {...props} />);
    const deleteButton = el.find('Button.remove');
    deleteButton.simulate('click');
    expect(props.onRemove.calledOnce).to.equal(true);
    expect(props.onRemove.args[0]).to.deep.equal([ props._id ]);
  });

  it('should call onInvite when .invite is clicked', () => {
    const props = {
      _id: '1',
      name: 'Alpha Shuro',
      phone: '073 790 7955',
      email: 'alpha@aepit.co.za',

      onInvite: spy(),
      onRemove: spy()
    };

    const el = shallow(<FacilitatorsListItem {...props} />);
    const inviteButton = el.find('Button.invite');
    inviteButton.simulate('click');
    expect(props.onInvite.calledOnce).to.equal(true);
  });
});
