const {describe, it} = global;
import {expect} from 'chai';
import {spy, assert} from 'sinon';
import {shallow} from 'enzyme';
import React from 'react';
import NewFacilitator from '../new_facilitator.jsx';

describe('facilitators.components.new_facilitator', () => {
  const getProps = () => ({
    error: null,
    handleCreateFacilitator: spy(),
  });
  describe('if there is error', () => {
    it('should render error', () => {
      const props = getProps();
      props.error = 'oops';

      const el = shallow(<NewFacilitator {...props}/>);
      expect(el.contains(props.error)).to.be.equal(true);
    });
  });
  it('should have an input for name', () => {
    const props = getProps();

    const el = shallow(<NewFacilitator />);
    const form = el.find('form[name="new-facilitator"]')

    const nameInput = form.render().find('input[name="name"]');
    expect(nameInput.length).to.be.equal(1);
  });
  it('should have an input for phone', () => {
    const props = getProps();

    const el = shallow(<NewFacilitator />);
    const form = el.find('form[name="new-facilitator"]')

    const phoneInput = form.render().find('input[name="phone"]');
    expect(phoneInput.length).to.be.equal(1);
  });
  it('should have an input for email', () => {
    const props = getProps();

    const el = shallow(<NewFacilitator />);
    const form = el.find('form[name="new-facilitator"]')

    const emailInput = form.render().find('input[name="email"]');
    expect(emailInput.length).to.be.equal(1);
  });
  it('should call handleCreateFacilitator when form is submitted', () => {
    const props = getProps();

    const el = shallow(<NewFacilitator {...props}/>);
    const form = el.find('form[name="new-facilitator"]')

    form.simulate('submit');

    assert.calledOnce(props.handleCreateFacilitator);
  });
});
