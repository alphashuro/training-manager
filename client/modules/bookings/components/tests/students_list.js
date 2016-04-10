const {describe, it} = global;
import React from 'react';
import {spy} from 'sinon';
import {shallow, render} from 'enzyme';
import {expect} from 'chai';
import StudentsList from '../students_list.jsx';
import AddStudentsModal from '../../containers/add_students_modal';

describe('bookings.components.students_list', () => {
  const getProps = () => ({
    studentIds: ['1', '2', '3'],
    bookingId: '1',
    error: null,
    showStudentsModal: spy()
  });

  it('should call showStudentsModal when .add-students is clicked', () => {
    const props = getProps();
    const el = shallow(<StudentsList {...props}/>);

    el.find('.add-students').simulate('click');

    expect(props.showStudentsModal.calledOnce).to.be.equal(true);
  });

  it('should have an AddStudentsModal with given bookingId', () => {
    const props = getProps();
    const modal = <AddStudentsModal bookingId={props.bookingId} />;
    const el = shallow(<StudentsList {...props}/>);

    expect(el.contains(modal)).to.be.equal(true);
  });

  it('should render error if there is error', () => {
    const props = getProps();
    props.error = 'oops';
    const el = shallow(<StudentsList {...props}/>);

    expect(el.find({children: props.error})).to.have.length(1);
  });

  it('should render StudentsListItem for all studentIds', () => {
    const props = getProps();
    const el = shallow(<StudentsList {...props}/>);

    expect(el.find('StudentsListItem').length).to.be.equal(props.studentIds.length);
  });
});
