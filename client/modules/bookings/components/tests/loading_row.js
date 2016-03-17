const {describe, it} = global;
import React from 'react';
import {render} from 'enzyme';
import {expect} from 'chai';
import LoadingRow from '../loading_row.jsx';

describe('bookings.components.loading_row', () => {
  it('should render a single row', () => {
    const el = render(<LoadingRow/>);

    expect(el.find('tr')).to.have.length(1);
  });
  describe('the row', () => {
    it('should contain the text Loading', () => {
      const el = render(<LoadingRow/>);

      expect(el.text()).to.match(/loading/i);
    });
  });
});
