const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import FacilitatorsList from '../facilitators_list.jsx';
import FacilitatorsListItem from '../../containers/facilitators_list_item';
import React from 'react';
import {Alert} from 'react-bootstrap';

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

  describe('if there is error', () => {
    it('should show the error', () => {
      const props = {
        facilitatorIds,
        error: 'oops'
      };

      const el = shallow(<FacilitatorsList {...props} />);
      const alerts = el.find('Alert');

      expect(alerts.length).to.be.equal(1);
      expect(alerts.equals(
        <Alert bsStyle='danger'>{props.error}</Alert>)
      ).to.equal(true);
    });
  });
});
