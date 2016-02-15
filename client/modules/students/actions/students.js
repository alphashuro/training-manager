export default {
  create({ Meteor, LocalState }, clientId) {
    if ( !clientId ) {
      return LocalState.set('STUDENTS_ERROR', 'Client\'s Id is required!');
    }

    LocalState.set('STUDENTS_ERROR', null);

    const _id = Meteor.uuid();

    const student = {
      _id,
      name: '',
      phone: '',
      email: '',
      clientId
    };

    Meteor.call( 'students.create', student, (error) => {
      if (error) {
        return LocalState.set('STUDENTS_ERROR', error.reason);
      }
    } );
  },

  remove({Meteor, LocalState}, id) {
    if (!id) {
      return LocalState.set('STUDENTS_ERROR', 'Id is required to remove student.');
    }

    Meteor.call('students.remove', id, (error) => {
      if (error) {
        LocalState.set('STUDENTS_ERROR', error.reason);
      }
    });
  },

  update({Meteor, LocalState}, id, options) {
    if (!id) {
      return LocalState.set('STUDENTS_ERROR', 'Student id is required for updates');
    }

    if (!options) {
      return LocalState.set('STUDENTS_ERROR', 'Update options required!');
    }
    const {name, phone, email} = options;

    Meteor.call( 'students.update', id, { name, phone, email }, (err) => {
      if (err) {
        LocalState.set('STUDENTS_ERROR', err.reason);
      }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('STUDENTS_ERROR', null);
  }
};
