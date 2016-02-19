import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {spy, stub} from 'sinon';
import {shallow, mount} from 'enzyme';
import Course from '../course.jsx';

describe('courses.components.course', () => {
  describe('if there is error', () => {
    it('should render error', () => {
      const props = {
        error: 'oops',
        course: {
          _id: 'id',
          title: 't-1',
          description: 'desc'
        },
        update: spy()
      };

      const el = shallow(<Course {...props}/>);
      expect(el.find({children: props.error}).length).to.be.equal(1);
    });
    it('should not have an alert when there is no error', () => {
      const props = {
        course: {
          _id: 'id',
          title: 't-1',
          description: 'desc'
        },
        update: spy()
      };

      const el = shallow(<Course {...props}/>);
      expect(el.find('Alert[bsStyle="danger"]').length).to.be.equal(0);
    });
    it('should render an input with title', () => {
      const props = {
        course: {
          _id: 'id',
          title: 't-1',
          description: 'desc'
        },
        update: spy()
      };

      const el = shallow(<Course {...props}/>);
      const titleI = el.find('Input[label="Title"]');
      expect(titleI.length).to.be.equal(1);
      expect(titleI.prop('defaultValue')).to.be.equal('t-1');
    });
    it('should render an input with description', () => {
      const props = {
        course: {
          _id: 'id',
          title: 't-1',
          description: 'desc'
        },
        update: spy()
      };

      const el = shallow(<Course {...props}/>);
      const descriptionI = el.find('Input[label="Description"]');
      expect(descriptionI.length).to.be.equal(1);
      expect(descriptionI.prop('defaultValue')).to.be.equal('desc');
    });
    // TODO: Mount isn't working with ClassesList import
    it('should call update when save is clicked', () => {
      // const props = {
      //   course: {
      //     _id: 'id',
      //     title: 't-1',
      //     description: 'desc'
      //   },
      //   update: spy()
      // };

      // const el = shallow(<Course {...props}/>);
      // const saveBtn = el.find('.save');
      // saveBtn.simulate('click');
    });
    // TODO: Mount isn't working with ClassesList import
    it('should call update with values entered in inputs', () => {
      // const props = {
      //   course: {
      //     _id: 'id',
      //     title: 't-1',
      //     description: 'desc'
      //   },
      //   update: spy()
      // };

      // const el = mount(<Course {...props}/>);
    });
  });
});
