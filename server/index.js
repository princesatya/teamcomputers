const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const { request, GraphQLClient } = require('graphql-request');

app.use(cors());
app.use(express.json());

// // Serve any static files built by React
// app.use(express.static(path.join(__dirname, "build")));

// app.get("/", cors(), function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.get("/", (req, res) => {
  res.send("Shop Proxy Server Running");
});

app.post("/token", (req, res) => {
  saveToken(req.body.token);
  console.log(`Received push token, ${req.body.token.length}`);
  res.send(`Received push token, ${req.body.token}`);
});

// const BASE_URL = 'http://13.68.224.224/pub/graphql/';
// const variables = {};
// const query = `
// query{
//   sliderdata{
//   banner_id
//     status
//   title
//   sub_title
//     image
//     url_banner
//   buy_now_url

//   }
// }
// `;
app.post("/graphql", (req, res) => {
  const base_url = req.body.base_url;
  const variables = req.body.variables;
  const query = req.body.query;
  console.log(query);
  // Run GraphQL queries/mutations using a static function
  request(base_url, query, variables, req.headers)
    .then((data) => {
      console.log(data);
      return res.send(data);
    })
    .catch((err) => {
      console.error(err)
      return res.send({status: 500, message: err.message});
    });

  // ... or create a GraphQL client instance to send requests
  // const client = new GraphQLClient(BASE_URL, { headers: {} })
  // client.request(query, variables).then((data) => console.log(data))
});

const PORT_NUMBER = 3001;
// app.listen(PORT_NUMBER, () => {
//   console.log(`Server Online on Port ${PORT_NUMBER}`);
// });

const options = {
  key: fs.readFileSync('config/shopuat.teamcomputers.key'),
  cert: fs.readFileSync('config/shopuat.teamcomputers.com.crt')
};
https.createServer(options, app).listen(PORT_NUMBER);