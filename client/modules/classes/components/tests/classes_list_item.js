import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {stub} from 'sinon';
import {shallow, mount} from 'enzyme';
import ClassesListItem from '../classes_list_item.jsx';

describe('class.components.class_list_item', () => {
  const getProps = () => ({
    _id: '1',
    title: 'title',
    description: 'description',
    duration: 1,
    price: 1,
    update: stub(),
    remove: stub()
  });

  it('should show a title', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const title = el.find({defaultValue: props.title});
    expect(title.length).to.be.equal(1);
  });
  it('should show a description', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const description = el.find({defaultValue: props.description});
    expect(description.length).to.be.equal(1);
  });
  it('should show a duration', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const description = el.find({defaultValue: props.description});
    expect(description.length).to.be.equal(1);
  });
  it('should show a price', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const description = el.find({defaultValue: props.description});
    expect(description.length).to.be.equal(1);
  });
  it('should call remove when .remove is clicked', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const remove = el.find('.remove');
    remove.simulate('click');
    expect(props.remove.calledOnce).to.be.equal(true);
    expect(props.remove.args[0][0]).to.be.equal(props._id);
  });
  it('should call update when .update is clicked', () => {
    const props = getProps();

    const el = mount(<ClassesListItem {...props}/>);
    const remove = el.find('.update');

    const titleI = el.find('Input[name="classTitle"]').get(0);
    const descriptionI = el.find('Input[name="classDescription"]').get(0);
    const durationI = el.find('Input[name="classDuration"]').get(0);
    const priceI = el.find('Input[name="classPrice"]').get(0);
    titleI.value = 'new_title';
    descriptionI.value = 'new_description';
    durationI.value = 10;
    priceI.value = 5000;

    remove.simulate('click');
    expect(props.update.calledOnce).to.be.equal(true);
    expect(props.update.args[0]).to.deep.equal([
      props._id,
      {
        title: 'new_title',
        description: 'new_description',
        duration: 10,
        price: 5000
      }
    ]);
  });
});
