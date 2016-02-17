const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import SessionsList from '../sessions_list.jsx';

describe('sessions.components.sessions_list', () => {
  it('should show alert if there is error', () => {
    const props = {
      sessionIds: [],
      error: 'oops'
    };

    const el = shallow(<SessionsList {...props} />);
    const alert = el.find('Alert');
    expect(alert.length).to.be.equal(1);
    expect(alert.get(0).props.children).to.be.equal(props.error);
  });
  it('should create SessionListItems for all sessionIds given', () => {
    const props = {
      sessionIds: [ '1', '2', '3' ]
    };

    const el = shallow(<SessionsList {...props} />);
    const listItems = el.find('SessionsListItem');
    expect(listItems.length).to.be.equal(props.sessionIds.length);
  });
});
