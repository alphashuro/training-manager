const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {shallow, mount} from 'enzyme';
import React from 'react';
import NewFacilitator from '../new_facilitator.jsx';

describe('facilitators.components.new_facilitator', () => {
  describe('if there is error', () => {
    it('should render error', () => {
      const props = {
        error: 'oops'
      };

      const el = shallow(<NewFacilitator {...props}/>);
      const alert = el.find('Alert');
      expect(alert.length).to.be.equal(1);
      expect(alert.prop('children')).to.be.equal(props.error);
    });
  });
  describe('if there is no error', () => {
    it('should not render alert', () => {
      const props = {};

      const el = shallow(<NewFacilitator {...props}/>);
      const alert = el.find('Alert');
      expect(alert.length).to.be.equal(0);
    });
  });
  it('should have an input for name', () => {
    const el = mount(<NewFacilitator />);
    const nameI = el.ref('nameRef');
    expect(nameI.length).to.be.equal(1);
  });
  it('should have an input for phone', () => {
    const el = mount(<NewFacilitator />);
    const phoneI = el.ref('phoneRef');
    expect(phoneI.length).to.be.equal(1);
  });
  it('should have an input for email', () => {
    const el = mount(<NewFacilitator />);
    const emailI = el.ref('emailRef');
    expect(emailI.length).to.be.equal(1);
  });
  it('should call create when save is clicked', () => {
    const props = {
      create: spy()
    };
    const el = mount(<NewFacilitator {...props}/>);
    const saveRef = el.ref('saveRef');
    saveRef.simulate('click');
    expect(props.create.calledOnce).to.be.equal(true);
  });
  it('should pass obj with name, phone, and email to create', () => {
    const props = {
      create: spy()
    };

    const el = mount(<NewFacilitator {...props}/>);

    const emailI = el.ref('emailRef').get(0);
    const nameI = el.ref('nameRef').get(0);
    const phoneI = el.ref('phoneRef').get(0);

    emailI.getValue = stub().returns('email');
    phoneI.getValue = stub().returns('phone');
    nameI.getValue = stub().returns('name');

    const saveB = el.ref('saveRef');
    saveB.simulate('click');

    expect(props.create.args[0][0]).to.deep.equal({
      name: 'name', email: 'email', phone: 'phone'
    });
  });
});
