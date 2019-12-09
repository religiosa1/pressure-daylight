/* eslint-env node */
const express = require('express');

const ADDR = "127.0.0.1";
const PORT = 5000;

let app = express();
app.use("/", express.static("public"));
app.get('/api/sensor/default/', (req, res) => res.sendFile("api/index.json", { root: __dirname }));

app.listen(PORT, ADDR, function () {
  console.log(`App is listening on http://${ADDR}:${PORT}/`);
});
