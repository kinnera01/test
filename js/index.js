console.log("I AM IN JS")
  var OAUTH2_CLIENT_ID = '144598218649-chvjjeteaa6239v3hou5soboqqjma9p2.apps.googleusercontent.com';
    var OAUTH2_SCOPES = ['https://www.googleapis.com/auth/youtube'];
    console.log(OAUTH2_CLIENT_ID)
    // Upon loading, the Google APIs JS client automatically invokes this callback.
    googleApiClientReady = function () {
      console.log("i am in googleApiClientReady")
      gapi.auth.init(function () {
        window.setTimeout(checkAuth, 1);
      });
    }
    // Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
    // If the currently logged-in Google Account has previously authorized
    // the client specified as the OAUTH2_CLIENT_ID, then the authorization
    // succeeds with no user intervention. Otherwise, it fails and the
    // user interface that prompts for authorization needs to display.
    function checkAuth() {
      console.log("i am in check auth")
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
      }, handleAuthResult);
    }

    // Handle the result of a gapi.auth.authorize() call.
    function handleAuthResult(authResult) {
      console.log("i am in handle auth")
      if (authResult && !authResult.error) {
        // Authorization was successful. Hide authorization prompts and show
        // content that should be visible after authorization succeeds.
        $('.pre-auth').hide();
        $('.post-auth').show();
        loadAPIClientInterfaces();
      } else {
        // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
        // client flow. The current function is called when that flow completes.
        $('#login-link').click(function () {
          alert("i am clicked");
          gapi.auth.authorize({
            client_id: OAUTH2_CLIENT_ID,
            scope: OAUTH2_SCOPES,
            immediate: false
          }, handleAuthResult);
        });
      }
    }

    // Load the client interfaces for the YouTube Analytics and Data APIs, which
    // are required to use the Google APIs JS client. More info is available at
    // https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
    function loadAPIClientInterfaces() {
      console.log("loadApicall")
      gapi.client.load('youtube', 'v3', function () {
        handleAPILoaded();
      });
    }
    var playlistId, channelId;
    // console.log("ids:"+youtubeids);
    // After the API loads, call a function to enable the playlist creation form.
    function handleAPILoaded() {
      enableForm();
    }
    // Enable the form for creating a playlist.
    function enableForm() {
      $("#playlist-button").attr("disabled", false);
    }

    // Create a private playlist.
    function createPlaylist() {
      var title = $("#Title").val();
      var description = $("#Desciption").val();
      console.log(title);
      console.log(description);
      var request = gapi.client.youtube.playlists.insert({
        part: "snippet,status",
        resource: {
          snippet: {
            title: title,
            description: description
          },
          status: {
            privacyStatus: "public"
          }
        }
      });
      request.execute(function (response) {
        var result = response.result;
        console.log(result);
        if (result) {
          playlistId = result.id;
          // console.log(playlistId)
          $("#playlist-id").val(playlistId);
          $("#playlist-Id").html(result.id);
        } else {
          $("#status").html("Could not create playlist");
        }
      });
    }

    // var videoId=["ZG1Su0QwPYs","_JVghQCWnRI","Y-xZIECiTwk"]
    // Add a video ID specified in the form to the playlist.
    var addVideoToPlaylist = function () {
      // getyoutubeids();
      alert("hey i reached")
      addToPlaylist($("#video-id").val());
    }
    // // Add a video to a playlist. The "startPos" and "endPos" values let you
    // start and stop the video at specific times when the video is played as
    // part of the playlist. However, these values are not set in this example.
    function addToPlaylist(id, startPos, endPos) {
      var playid = $("#playlist-id").val();
      console.log(
        "in addToPlaylist with " + id + "sending to playlist : " + playid
      );
      var details = {
        playlistId: playid,
        videoId: id,
        kind: "youtube#video"
      };
      console.log(details);
      if (startPos != undefined) {
        details["startAt"] = startPos;
      }
      if (endPos != undefined) {
        details["endAt"] = endPos;
      }
      // console.log(playlistId);
      var request = gapi.client.youtube.playlistItems.insert({
        part: "snippet",
        resource: {
          snippet: {
            playlistId: details.playlistId,
            resourceId: details
          }
        }
      });
      //console.log(request)
      request.execute(function (response) {
        $("#status").html("<pre>" + JSON.stringify(response.result) + "</pre>");
      });
    }

    function addTheseVideosToPlaylist() {
      var links = ids;
      var counter = 0;

      function addVideosToPlaylist() {
        myLoop(links[0]);
      }

      function myLoop(video_id) {
        addToPlaylist(video_id);
        setTimeout(function () {
          counter++;
          if (counter < links.length) myLoop(links[counter]);
        }, 3000);
      }
    }
    // AJAX post the data to the friends API.
    $.post("/", youtubeids, function (data) {
      console.log("seing wether i can acess youtube ids here")
      console.log(data)

    });