const {describe, it} = global;
import React from 'react';
import {spy, assert} from 'sinon';
import {shallow, render} from 'enzyme';
import {expect} from 'chai';
import StudentsSelect from '../students_select.jsx';


describe('bookings.components.students_select', () => {
  const getProps = () => ({
    students: [
      {_id: '1', name: 'name1'},
      {_id: '2', name: 'name2'},
      {_id: '3', name: 'name3'}
    ],
    add: spy(),
    remove: spy(),
    bookingId: '1',
    bookingStudents: ['2'],
    error: null
  });

  it(`should show error if there is error`, () => {
    const props = getProps();
    props.error = 'oops';
    const el = shallow(<StudentsSelect {...props}/>);

    expect(el.find({children: props.error})).to.have.length(1);
  });
  describe(`if there are students`, () => {
    it(`should show a ListGroupItem for each student`, () => {
      const props = getProps();
      const el = shallow(<StudentsSelect {...props}/>);

      expect(el.find('ListGroupItem')).to.have.length(props.students.length);
    });
    describe('the ListGroupItem', () => {
      it(`should render the student's name`, () => {
        const props = getProps();
        const el = shallow(<StudentsSelect {...props}/>);
        expect(el.contains({children: props.name})).to.be.equal(true);
      });
      describe(`if the student's id is in bookingStudents`, () => {
        it(`should render a .remove button`, () => {
          const props = getProps();
          props.students = [
            {_id: '2', name: 'name2'},
          ];
          props.bookingStudents = ['2'];
          const el = shallow(<StudentsSelect {...props}/>);
          const item = el.find('ListGroupItem');
          expect(item.find('.remove')).to.have.length(1);
        });
        it(`should not render a .add button`, () => {
          const props = getProps();
          props.students = [
            {_id: '2', name: 'name2'},
          ];
          props.bookingStudents = ['2'];
          const el = shallow(<StudentsSelect {...props}/>);
          const item = el.find('ListGroupItem');

          expect(item.find('.add')).to.have.length(0);
        });
        it(`should call remove
          with bookingId and student._id
          when .remove is clicked`, () => {
          const props = getProps();
          props.students = [
            {_id: '2', name: 'name2'},
          ];
          props.bookingStudents = ['2'];
          const el = shallow(<StudentsSelect {...props}/>);
          const item = el.find('ListGroupItem');

          item.find('.remove').simulate('click');

          assert.calledWith(props.remove, props.bookingId, props.students[0]._id);
        });
      });
      describe(`if the student's id is not in bookingStudents`, () => {
        it(`should render a .add button`, () => {
          const props = getProps();
          props.students = [
            {_id: '2', name: 'name2'},
          ];
          props.bookingStudents = [];
          const el = shallow(<StudentsSelect {...props}/>);
          const item = el.find('ListGroupItem');
          expect(item.find('.remove')).to.have.length(0);
        });
        it(`should not render a .remove button`, () => {
          const props = getProps();
          props.students = [
            {_id: '2', name: 'name2'},
          ];
          props.bookingStudents = [];
          const el = shallow(<StudentsSelect {...props}/>);
          const item = el.find('ListGroupItem');
          expect(item.find('.add')).to.have.length(1);
        });
        it(`should call add when .add is clicked`, () => {
          const props = getProps();
          props.students = [
            {_id: '2', name: 'name2'},
          ];
          props.bookingStudents = [];
          const el = shallow(<StudentsSelect {...props}/>);
          const item = el.find('ListGroupItem');

          item.find('.add').simulate('click');

          assert.calledWith(props.add, props.bookingId, props.students[0]._id);
        })
      });
    });
  });
});
