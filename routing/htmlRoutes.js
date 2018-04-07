// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
var SolrNode = require("solr-node");
console.log("hey i am in routes")
// ===============================================================================
// ROUTING
// ===============================================================================
var youtubeids={
  ids:[]};
module.exports = function(app) {
  
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // -------------------------------------------------------------------------
  app.post("/", function(req, res) {
    console.log("i am in htmlroutes page")
    var searchyear = req.body.year;
    var client = new SolrNode({
      host: "aurora.cs.rutgers.edu",
      port: "8181",
      core: "discogs_data_test",  
      protocol: "http"
    });
    var strQuery = client
      .query()
      .q({ releaseDate:searchyear })
      .sort({ viewcountRate: "desc" })
      .start(0)
      .rows(20);

    client.search(strQuery, function(err, result) {
      console.log("hey i am in solr");
      // console.log(result.responseHeader.status)
      if (err) {
        console.log(err);
        return;
      }
      var docs = result.response.docs;
      docs.forEach(element => {
         youtubeids.ids.push(element.youtubeId);
        // addToPlaylist(element.youtubeId);
        // res.redirect("/")
      });
      // module.exports = { ids: youtubeids };
      // console.log(youtubeids)
    res.json(youtubeids);
    });
  })
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    //console.log(res);
    //console.log(__dirname);
  });

 // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
   // console.log(res);
  });
};
