import {Mongo} from 'meteor/mongo';

const Facilitators = new Mongo.Collection('facilitators');
Facilitators.helpers({
  invite() {}
});

export default Facilitators;
