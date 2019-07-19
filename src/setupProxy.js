module.exports = app => {
  app.post("control", (request, response) => {
    console.log(request.body);
    response.status(200).end();
  });
}
