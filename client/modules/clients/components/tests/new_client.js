import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {shallow, mount} from 'enzyme';
import NewClient from '../new_client.jsx';

describe('clients.components.new_client', () => {
  describe('if there is error', () => {
    it('should render an alert with error', () => {
      const props = {
        error: 'oops'
      };

      const el = shallow(<NewClient {...props}/>);
      const alert = el.find('Alert[bsStyle="danger"]');
      expect(alert.length).to.be.equal(1);
      expect(alert.prop('children')).to.be.equal(props.error);
    });
  });
  describe('if there is no error', () => {
    it('should not render an alert', () => {
      const props = {
      };

      const el = shallow(<NewClient {...props}/>);
      const alert = el.find('Alert[bsStyle="danger"]');
      expect(alert.length).to.be.equal(0);
    });
  });
  it('should call create when save is clicked', () => {
    const props = {
      create: spy()
    };

    const el = mount(<NewClient {...props}/>);
    const saveBtn = el.find('.save');
    saveBtn.simulate('click');

    expect(props.create.calledOnce).to.be.equal(true);
  });
  it('should pass new name, phone and email on to create', () => {
    const props = {
      create: spy()
    };

    const el = mount(<NewClient {...props}/>);

    const nameI = el.find('Input[name="clientName"]').get(0);
    const phoneI = el.find('Input[name="clientPhone"]').get(0);
    const emailI = el.find('Input[name="clientEmail"]').get(0);

    nameI.value = 'new_name';
    phoneI.value = 'new_phone';
    emailI.value = 'new_email';

    const saveBtn = el.find('.save');
    saveBtn.simulate('click');

    expect(props.create.args[0]).to.deep.equal([
      'new_name',
      'new_phone',
      'new_email'
    ]);
  });
});
