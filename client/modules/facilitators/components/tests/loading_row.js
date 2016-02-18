const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import LoadingRow from '../loading_row.jsx';

describe('facilitators.components.loading_row', () => {
  it('should render a table row', () => {
    const el = shallow(<LoadingRow />);
    expect(el.find('tr').length).to.be.equal(1);
  });
});
