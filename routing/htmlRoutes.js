// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // -------------------------------------------------------------------------
  app.post("/search",function(req,res){
    console.log("routes"+"form Submited")
    // console.log(req.body.playid);
    // var newplaylist={
    //   playlistid=req.body.playid,
    //   year=req.body.year
    // }
   

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
