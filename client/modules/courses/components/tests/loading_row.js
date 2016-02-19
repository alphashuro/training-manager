import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {shallow} from 'enzyme';
import LoadingRow from '../loading_row.jsx';

describe('courses.components.loading_row', () => {
  it('should render a table row', () => {
    const el = shallow(<LoadingRow/>);
    const tr = el.find('tr');
    expect(tr.length).to.be.equal(1);
  });
});
