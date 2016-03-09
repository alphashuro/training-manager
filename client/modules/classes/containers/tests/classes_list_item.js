
const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
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

      const map = depsMapper(context, actions);
      expect(map.context).to.be.a('function');
      expect(map.context()).to.deep.equal(context);
    });

    it('correctly maps remove', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {classes: {remove: spy(), update: spy()}};

      const map = depsMapper(context, actions);
      expect(map.remove).to.be.a('function');
      map.remove();
      expect(actions.classes.remove.calledOnce).to.be.equal(true);
    });

    it('correctly maps update', () => {
      const context = {Meteor: {}, Collections: {}};
      const actions = {classes: {remove: spy(), update: spy()}};

      const map = depsMapper(context, actions);
      expect(map.update).to.be.a('function');
      map.update();
      expect(actions.classes.update.calledOnce).to.be.equal(true);
    });
  });
});
