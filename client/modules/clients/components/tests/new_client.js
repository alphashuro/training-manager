import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {spy, assert} from 'sinon';
import {shallow} from 'enzyme';
import NewClient from '../new_client.jsx';

describe('clients.components.new_client', () => {
  const getProps = () => ({
    error: null,
    handleCreateClient: spy(),
  });
  describe('if there is error', () => {
    it('should show the error', () => {
      const props = getProps();
      props.error = 'oops';

      const el = shallow(<NewClient {...props}/>);

      expect(el.contains(props.error)).to.be.equal(true);
    });
  });
  it(`should have an input for name`, () => {
    const props = getProps();

    const el = shallow(<NewClient {...props}/>);
    const form = el.find('form[name="new-client"]');

    expect(form.render().find('input[name="name"]')).to.have.length(1);
  });
  it(`should have an input for phone`, () => {
    const props = getProps();

    const el = shallow(<NewClient {...props}/>);
    const form = el.find('form[name="new-client"]');

    expect(form.render().find('input[name="phone"]')).to.have.length(1);
  });
  it(`should have an input for email`, () => {
    const props = getProps();

    const el = shallow(<NewClient {...props}/>);
    const form = el.find('form[name="new-client"]');

    expect(form.render().find('input[name="email"]')).to.have.length(1);
  });
  it('should call handleCreateClient when form is submitted', () => {
    const props = getProps();

    const el = shallow(<NewClient {...props}/>);
    const form = el.find('form[name="new-client"]');

    form.simulate('submit');

    assert.calledOnce(props.handleCreateClient);
  });
});
