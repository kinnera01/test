// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friendsData, etc.
// ===============================================================================
var path = require("path");
var SolrNode = require("solr-node");
// ===============================================================================
// ROUTING
// ===============================================================================
var client = new SolrNode({
  host: "aurora.cs.rutgers.edu",
  port: "8181",
  core: "discogs_data_test",
  protocol: "http"
});

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // ---------------------------------------------------------------------------

  // app.get("/", function(req, res) {
  //   res.json(friendsData);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/", function(req, res) {
    console.log("i am in routes page")
    // console.log(res);
    var searchyear = req.body;
    var strQuery = client
      .query()
      .q({ releaseDate: searchyear })
      .sort({ viewcountRate: "desc" })
      .start(0)
      .rows(20);
    // console.log(strQuery);
    client.search(strQuery, function(err, result) {
      console.log("hey i am in solr");
      console.log(result.responseHeader.status);
      if (err) {
        console.log(err);
        return;
      }
      // console.log("Response:", result.response.docs);
      var docs = result.response.docs;
      docs.forEach(element => {
        console.log(element.youtubeids);
      });
    });
  }); //end of post
}; //end
