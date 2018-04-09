// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
var SolrNode = require("solr-node");
console.log("hey i am in routes")
// ===============================================================================
// ROUTING

module.exports = function(app) {
  app.get("/:year", function(req, res) {
    var searchyear="";
      searchyear = req.params.year;
      console.log(searchyear)
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

       var docs = result.response.docs;

      // docs.forEach(element => {
      //   youtubeids.id.push(element.youtubeId);
      // });
      // var hbsObject = {
      //   youtubeids: ids,
      // };
      // module.exports = { ids: youtubeids };
      // console.log(youtubeids)
    // res.render("../public/index.html",hbsObject);
    // console.log(youtubeids);
    res.json(docs);
  })
    // }
    
    

  
})
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

}
