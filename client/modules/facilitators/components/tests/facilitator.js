const {describe, it} = global;
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy, stub} from 'sinon';
import React from 'react';
import Facilitator from '../facilitator.jsx';

describe('facilitators.components.facilitator', () => {
  describe('if there is error', () => {
    it('should render given error', () => {
      const props = {
        error: 'oops',
        facilitator: {
          emails: [
            { address: 'addr' }
          ],
          profile: {
            name: 'name',
            phone: 'phone'
          }
        }
      };

      const el = shallow(<Facilitator {...props} />);
      const alert = el.find('Alert');
      expect(alert.length).to.be.equal(1);
      expect(alert.get(0).props.children).to.be.equal(props.error);
    });
  });
  describe('if there is no error', () => {
    it('should not render an alert', () => {
      const props = {
        facilitator: {
          emails: [
            { address: 'addr' }
          ],
          profile: {
            name: 'name',
            phone: 'phone'
          }
        }
      };

      const el = shallow(<Facilitator {...props} />);
      const alert = el.find('Alert');
      expect(alert.length).to.be.equal(0);
    });
  });
  it('should render the email in an input', () => {
    const props = {
      error: 'oops',
      facilitator: {
        emails: [
          { address: 'addr' }
        ],
        profile: {
          name: 'name',
          phone: 'phone'
        }
      }
    };

    const el = mount(<Facilitator {...props} />);
    const emailI = el.ref('emailRef');
    expect(emailI.length).to.be.equal(1);
    expect(emailI.prop('defaultValue')).to.be.equal(props.facilitator.emails[0].address);
  });
  it('should render the name in an input', () => {
    const props = {
      error: 'oops',
      facilitator: {
        emails: [
          { address: 'addr' }
        ],
        profile: {
          name: 'name',
          phone: 'phone'
        }
      }
    };

    const el = mount(<Facilitator {...props} />);
    const nameI = el.ref('nameRef');
    expect(nameI.length).to.be.equal(1);
    expect(nameI.prop('defaultValue')).to.be.equal(props.facilitator.profile.name);
  });
  it('should render the phone in an input', () => {
    const props = {
      error: 'oops',
      facilitator: {
        emails: [
          { address: 'addr' }
        ],
        profile: {
          name: 'name',
          phone: 'phone'
        }
      }
    };

    const el = mount(<Facilitator {...props} />);
    const phoneI = el.ref('phoneRef');
    expect(phoneI.length).to.be.equal(1);
    expect(phoneI.prop('defaultValue')).to.be.equal(props.facilitator.profile.phone);
  });
  describe('save', () => {
    it('should call update save button is clicked', () => {
      const props = {
        error: 'oops',
        facilitator: {
          _id: '123',
          emails: [
            { address: 'addr' }
          ],
          profile: {
            name: 'name',
            phone: 'phone'
          }
        },
        update: spy()
      };

      const el = mount(<Facilitator {...props} />);
      const saveB = el.ref('saveRef');
      const nameI = el.ref('nameRef').get(0);
      const phoneI = el.ref('phoneRef').get(0);
      nameI.getValue = stub();
      phoneI.getValue = stub();
      nameI.getValue.returns('new name');
      phoneI.getValue.returns('new phone');
      saveB.simulate('click');

      expect(nameI.getValue.calledOnce).to.be.equal(true);
      expect(phoneI.getValue.calledOnce).to.be.equal(true);
      expect(props.update.calledOnce).to.be.equal(true);

      expect(props.update.args[0][0]).to.be.equal(props.facilitator._id);
      expect(props.update.args[0][1]).to.deep.equal({
        name: 'new name',
        phone: 'new phone'
      });
    });
  });
});
