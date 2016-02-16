export default {

  create({ Meteor, LocalState, FlowRouter }, name, phone, email) {
    if (!name || !phone || !email) {
      return LocalState.set('FACILITATOR_ERROR', 'Name phone and email are required!');
    }

    LocalState.set('FACILITATOR_ERROR', null);

    const _id = Meteor.uuid();
    const user = Meteor.user();
    const org = user.profile.org;

    Meteor.call( 'facilitators.create', { _id, name, phone, email, org }, (error) => {
      if (error) {
        return LocalState.set('FACILITATOR_ERROR', error.reason);
      }
    });

    FlowRouter.go(`/facilitators/${_id}`);
  },

  remove({Meteor, LocalState}, id) {
    if (!id) {
      return LocalState.set('FACILITATOR_ERROR', 'Id is required to remove facilitator.');
    }

    Meteor.call('facilitators.remove', id, (error) => {
      if (error) { LocalState.set('FACILITATOR_ERROR', error.reason); }
    });
  },

  update({Meteor, LocalState}, id, { name, phone, email }) {
    Meteor.call(
      'facilitators.update',
      id, { name, phone, email },
      (err) => {
        if (err) { LocalState.set('FACILITATOR_ERROR', err.reason); }
      });
  },

  clearErrors({LocalState}) {
    return LocalState.set('FACILITATOR_ERROR', null);
  },

  invite({LocalState, Meteor}, email) {
    if (!email) {
      return LocalState.set('FACILITATOR_ERROR', 'Email is required to invite a user!');
    }

    const user = Meteor.user();
    const org = user.profile.org;

    Meteor.call('facilitators.invite', {email, org}, (err) => {
      if (err) {
        LocalState.set('FACILITATOR_ERROR', err.reason);
      }
    });
  },
};
