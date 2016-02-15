const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import FacilitatorsList from '../facilitators_list.jsx';
import FacilitatorsListItem from '../../containers/facilitators_list_item';
import React from 'react';

describe('facilitators.components.facilitators_list', () => {
  const facilitatorIds = [ '1','2' ];

  it('should list given number of facilitator ids', () => {
    const props = {
      facilitatorIds
    };

    const el = shallow(
      <FacilitatorsList {...props}/>
    );
    expect(el.find(FacilitatorsListItem).length).to.be.equal(facilitatorIds.length);
  });
});
