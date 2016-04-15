[ ![Codeship Status for alphashuro/training-manager](https://codeship.com/projects/dfc7a480-b626-0133-a78e-7a4b33b8d70b/status?branch=master)](https://codeship.com/projects/134285)

# Training Company Manager

A meteor app for managing your training company.

## Development

```bash
git clone https://github.com/alphashuro/training-manager.git
cd training-manager
meteor npm install
meteor
```
The app will be served at localhost:3000

## Deployment
Codeship has the development configuration setup, and will automatically deploy if your build passes.
  - pushes to develop are deployed to staging
  - pushes to master are deployed to all clients

## Version history
- v2.1
  - __Add Email invitation and enrollment for facilitators__
  - __Various bug fixes__
- v2.0
  - __One company per deploy__
    * Instead of one app for all companies, the app should be deployed and run seperately for each company.
    * This also means no more signup functionality, instead it starts with a default admin user
  - __Removed facilitator from bookings__
    * A booking now consists only of a course and its sessions
    * Facilitator will only be assigned to sessions
  - __Upgraded to Meteor 1.3.1__
- v1.0
  - __Wrote all the tests__
