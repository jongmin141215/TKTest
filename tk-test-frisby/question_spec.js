var frisby = require('frisby');

frisby.create("Testing if we can get questions with authentication")
  .post("http://localhost:3000/api/AppUsers/login", {
    email: 'test@test.com',
    password: 'password'
  }, { json: true })
  .expectStatus(200)
  .expectJSONTypes({
    id: String
  })
  .afterJSON(function(user) {
    frisby.globalSetup({
      request: {
        headers: { 'access_token': user.id }
      }
    });
    frisby.create("Logged in now, getting questions")
      .get("http://localhost:3000/api/Questions?access_token=" + user.id)
      .expectStatus(200)
      .expectJSONTypes('*', {
        Question_Number: Number,
        Answer_ID: String,
        Text: String,
        Style: String,
        id: String
      })
      .toss();
  })
.toss();
