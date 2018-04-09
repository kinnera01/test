
var SolrNode = require("solr-node");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Tells node that we are creating an "express" server
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use("/static", express.static(path.join(__dirname, "app/public")));
require("./routing/htmlRoutes")(app);
// require("./routing/apiRoutes")(app);
var PORT = process.env.PORT || 8080 ;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

