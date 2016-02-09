import { Users } from '/lib/collections';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

const users = [
  {
    profile: {
      org: 'aepit',
      role: 'admin'
    },
    email: 'alpha@aepit.co.za',
    password: 'password'
  }
];

// TODO: Write seeds for all collections
export default function () {
  if (!Users.findOne()) {
    users.forEach(user => {
      const id = Accounts.createUser(user);
      Roles.addUsersToRole( id, user.profile.role );
    });
  }
}
