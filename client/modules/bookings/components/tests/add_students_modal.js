const {describe, it} = global;
import React from 'react';
import {spy, stub} from 'sinon';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import AddStudentsModal from '../add_students_modal.jsx';

describe('bookings.components.add_students_modal', () => {
  const getProps = () => ({
    bookingId: 'id',
    show: false,
    close: spy()
  });
  it('should be visible if show is true', () => {
    const props = getProps();
    props.show = true;

    const el = shallow(<AddStudentsModal {...props}/>)
    const modal = el.find('Modal');
    expect(modal.prop('show')).to.be.equal(true);
  });
  it('should not be visible if show is false', () => {
    const props = getProps();

    const el = shallow(<AddStudentsModal {...props}/>)
    const modal = el.find('Modal');
    expect(modal.prop('show')).to.be.equal(false);
  });
  it('should call close on .close is clicked', () => {
    const props = getProps();

    const el = shallow(<AddStudentsModal {...props}/>);
    const closeBtn = el.find('.close');
    closeBtn.simulate('click');
    expect(props.close.calledOnce).to.be.equal(true);
  });
});
