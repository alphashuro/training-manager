const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import MainLayout from '../main_layout.jsx';
import Navigation from '../../containers/navigation';
import React from 'react';

describe('core.components.main_layout', () => {
  const getProps = (Childrens = null) => ({
    content: () => Childrens,
  });
	it('should contain navigation', () => {
    const props = getProps();
  	const el = shallow(<MainLayout {...props}/>);
  	expect(el.contains(<Navigation/>)).to.be.equal(true);
  });

	it('should render childrens', () => {
    const Child = () => <p>Hello</p>;
    const props = getProps(<Child/>);
  	const el = shallow(<MainLayout {...props}/>);

  	expect(el.contains(<Child/>)).to.be.equal(true);
  });
});
