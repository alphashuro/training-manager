import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {spy, stub} from 'sinon';
import {shallow, mount} from 'enzyme';
import Client from '../client.jsx';

describe('clients.components.client', () => {
  describe('if there is error', () => {
    it('should render error', () => {
      const props = {
        error: 'oops',
        client: {
          _id: 'id',
          name: 'name',
          phone: 'phone',
          email: 'email'
        },
        update: spy()
      };

      const el = shallow(<Client {...props}/>);
      expect(el.find({children: props.error}).length).to.be.equal(1);
    });
    it('should not have an alert when there is no error', () => {
      const props = {
        client: {
          _id: 'id',
          name: 'name',
          phone: 'phone',
          email: 'email'
        },
        update: spy()
      };

      const el = shallow(<Client {...props}/>);
      expect(el.find('Alert[bsStyle="danger"]').length).to.be.equal(0);
    });
    it('should render an input with name', () => {
      const props = {
        client: {
          _id: 'id',
          name: 'name',
          phone: 'phone',
          email: 'email'
        },
        update: spy()
      };

      const el = shallow(<Client {...props}/>);
      const nameI = el.find('Input[label="Name"]');
      expect(nameI.length).to.be.equal(1);
      expect(nameI.prop('defaultValue')).to.be.equal('name');
    });
    it('should render an input with phone', () => {
      const props = {
        client: {
          _id: 'id',
          name: 'name',
          phone: 'phone',
          email: 'email'
        },
        update: spy()
      };

      const el = shallow(<Client {...props}/>);
      const phoneI = el.find('Input[label="Phone"]');
      expect(phoneI.length).to.be.equal(1);
      expect(phoneI.prop('defaultValue')).to.be.equal('phone');
    });
    it('should render an input with email', () => {
      const props = {
        client: {
          _id: 'id',
          name: 'name',
          email: 'email',
          email: 'email'
        },
        update: spy()
      };

      const el = shallow(<Client {...props}/>);
      const emailI = el.find('Input[label="Email"]');
      expect(emailI.length).to.be.equal(1);
      expect(emailI.prop('defaultValue')).to.be.equal('email');
    });
    // TODO: Mount isn't working with ClassesList import
    it('should call update when save is clicked', () => {
      // const props = {
      //   client: {
          // _id: 'id',
          // name: 'name',
          // phone: 'phone',
          // email: 'email'
      //   },
      //   update: spy()
      // };

      // const el = shallow(<Client {...props}/>);
      // const saveBtn = el.find('.save');
      // saveBtn.simulate('click');
    });
    // TODO: Mount isn't working with ClassesList import
    it('should call update with values entered in inputs', () => {
      // const props = {
      //   client: {
          // _id: 'id',
          // name: 'name',
          // phone: 'phone',
          // email: 'email'
      //   },
      //   update: spy()
      // };

      // const el = mount(<Client {...props}/>);
    });
  });
});
