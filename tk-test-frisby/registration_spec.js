var frisby = require('frisby');

var userModel = new Date().getTime() + "";
var userModel2 = userModel + "2";
frisby.create('Testing user registration')
  .post('http://localhost:3000/api/AppUsers', {
    firstName: userModel,
    lastName: userModel,
    email: userModel + '@test.com',
    organization: 'SSF',
    password: 'password'
  })
  .expectStatus(200)
  .after(function(err, res, body) {
    frisby.create('Delete created test user')
      .post('http://localhost:3000/api/AppUsers/login', {
        email: userModel + '@test.com',
        password: 'password'
      })
      .expectStatus(200)
      .afterJSON(function(user) {
        frisby.globalSetup({
          request: {
            headers: { 'access_token': user.id }
          }
        });
        frisby.create('deleting registered model now')
          .delete('http://localhost:3000/api/AppUsers/' + user.userId + "?access_token=" + user.id)
          .expectStatus(200)
          .toss();
      }).toss()
  })
.toss();
