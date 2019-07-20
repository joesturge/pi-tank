const bodyParser = require('body-parser');

module.exports = app => {

  app.use(bodyParser.json());

  app.post("/control", (request, response) => {
    console.log(request.body);
    response.status(200).end();
  });
};
