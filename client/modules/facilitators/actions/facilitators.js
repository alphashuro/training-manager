export default {

  create({ Meteor, LocalState, FlowRouter }, { name, phone, email }) {
    if (!name || !phone || !email) {
      return LocalState.set('FACILITATOR_ERROR', 'Name phone and email are required!');
    }

    LocalState.set('FACILITATOR_ERROR', null);

    const user = Meteor.user();
    const org = user.profile.org;

    Meteor.call( 'facilitators.create', { name, phone, email, org }, (error, id) => {
      if (error) {
        LocalState.set('FACILITATOR_ERROR', error.reason);
      } else {
        FlowRouter.go(`/facilitators/${id}`);
      }
    });
  },

  remove({Meteor, LocalState}, id) {
    if (!id) {
      return LocalState.set('FACILITATOR_ERROR', 'Id is required!');
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

  invite({LocalState, Meteor}, id) {
    if (!id) {
      return LocalState.set('FACILITATOR_ERROR', 'Id is required to invite a user!');
    }

    Meteor.call('facilitators.invite', id, (err) => {
      if (err) {
        LocalState.set('FACILITATOR_ERROR', err.reason);
      }
    });
  },
};
