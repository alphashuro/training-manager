
const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy, assert} from 'sinon';
import {composer, depsMapper} from '../classes_list_item';

describe('classes.containers.class_list_item', () => {
  describe('composer', () => {
    it('should subscribe to classes.single', () => {
      const Meteor = {
        subscribe: stub().returns({ready: () => false})
      };

      const context = () => ({Meteor});
      const _id = '1';

      composer({context, _id});

      expect(Meteor.subscribe.calledOnce).to.be.equal(true);
      expect(Meteor.subscribe.args[0]).to.deep.equal([
        'classes.single', _id
      ]);
    });
    describe('after subscribing', () => {
      it('should call onData with the class from Classes Collection', () => {
        const Meteor = {subscribe: stub()};
        Meteor.subscribe.returns({ready: () => true});
        const Collections = { Classes: {findOne: stub()} };
        const _class = {
          _id: '1',
          name: 'name',
          phone: 'phone',
          email: 'email'
        };
        Collections.Classes.findOne.returns(_class);

        const context = () => ({Meteor, Collections});
        const _id = '1';
        const onData = spy();

        composer({context, _id}, onData);

        expect(onData.calledOnce).to.be.equal(true);
        expect(onData.args[0]).to.deep.equal([
          null,
          {..._class}
        ]);
      });
    });
  });
  describe('depsMapper', () => {
    it('correctly maps context', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {classes: {remove: spy(), update: spy()}};

      const props = depsMapper(context, actions);
      expect(props.context).to.be.a('function');
      expect(props.context()).to.deep.equal(context);
    });

    it('should map handleRemove to remove the given id', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {classes: {remove: spy(), update: spy()}};

      const props = depsMapper(context, actions);
      expect(props.handleRemove).to.be.a('function');
      props.handleRemove('id');
    });

    it('should map handleUpdate to update given id with passed values from event target, converting duration and price to numbers', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {classes: {remove: spy(), update: spy()}};

      const props = depsMapper(context, actions);
      expect(props.handleUpdate).to.be.a('function');
      const event = {
        preventDefault: spy(),
        target: {
          dummyProp: 'xyz',
          title: {value: 'title'},
          description: {value: 'description'},
          duration: {value: '2'},
          price: {value: '2'},
        },
      };
      props.handleUpdate('id', event);
      expect(actions.classes.update.calledOnce).to.be.equal(true);
      assert.calledWithExactly(actions.classes.update, 'id', {
        title: 'title',
        description: 'description',
        duration: 2,
        price: 2
      });
    });
  });
});
