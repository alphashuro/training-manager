const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy, assert} from 'sinon';
import React from 'react';
import Facilitator from '../facilitator.jsx';

describe('facilitators.components.facilitator', () => {
  const getProps = () => ({
    error: null,
    facilitator: {
      email: 'email@address.com',
      name: 'name',
      phone: 'phone',
    },
    handleUpdateFacilitator: spy(),
  });
  describe('if there is error', () => {
    it('should render given error', () => {
      const props = getProps();
      props.error = 'oops';

      const el = shallow(<Facilitator {...props} />);

      expect(el.contains(props.error)).to.be.equal(true);
    });
  });
  it('should render the email in an input', () => {
    const props = getProps();

    const el = shallow(<Facilitator {...props} />);
    const form = el.find('form[name="edit-facilitator"]')

    const emailInput = form.render().find('input[name="email"]')
    expect(emailInput.length).to.be.equal(1);
    expect(emailInput.get(0).attribs.value).to.be.equal(props.facilitator.email);
  });
  it('should render the name in an input', () => {
    const props = getProps();

    const el = shallow(<Facilitator {...props} />);
    const form = el.find('form[name="edit-facilitator"]')

    const nameInput = form.render().find('input[name="name"]')
    expect(nameInput.length).to.be.equal(1);
    expect(nameInput.get(0).attribs.value).to.be.equal(props.facilitator.name);
  });
  it('should render the phone in an input', () => {
    const props = getProps();

    const el = shallow(<Facilitator {...props}/>);
    const form = el.find('form[name="edit-facilitator"]')

    const phoneInput = form.render().find('input[name="phone"]')
    expect(phoneInput.length).to.be.equal(1);
    expect(phoneInput.get(0).attribs.value).to.be.equal(props.facilitator.phone);
  });
  it('should call handleUpdateFacilitator when form is submitted', () => {
    const props = getProps();

    const el = shallow(<Facilitator {...props}/>);
    const form = el.find('form[name="edit-facilitator"]')

    form.simulate('submit');

    assert.calledOnce(props.handleUpdateFacilitator);
  });
});
