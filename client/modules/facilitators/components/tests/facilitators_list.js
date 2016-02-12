const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import FacilitatorsList from '../facilitators_list.jsx';

describe('facilitators.components.facilitators_list', () => {
  const facilitators = [
    {
      _id: '1',
      name: 'f-1',
      phone: '012',
      email: 'f1@f.com',
      org: 'org'
    },
    {
      _id: '2',
      name: 'f-2',
      phone: '013',
      email: 'f2@f.com',
      org: 'org'
    }
  ];

  it('should list given number of facilitators', () => {
    const el = shallow(<FacilitatorsList facilitators={facilitators}/>);
    expect(el.find('.facilitator-item').length).to.be.equal(facilitators.length);
  });
});
