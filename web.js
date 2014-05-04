var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();

var Evernote = require('evernote').Evernote;
var config = require('./config.json');
var callbackUrl = "http://localhost:3000/oauth_callback";

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
//app.use(express.json());
app.use(require('body-parser')());
app.use(require('method-override')());
app.use(cookieParser('secret'));
app.use(session());
app.use(function(req, res, next) {
  res.locals.session = req.session;
    next();
  });

app.get('/', function(req, res){
  if(req.session.oauthAccessToken) {
    var token = req.session.oauthAccessToken;
    var client = new Evernote.Client({
      token: token,
      sandbox: config.SANDBOX
    });
    var noteStore = client.getNoteStore();
    //var userstore = client.getUserStore();
    //var username = userstore.getUser({token: token});
    noteStore.listNotebooks(function(err, notebooks){
      req.session.notebooks = notebooks;
      res.render('index', { title : "Logged in", loggedin: true });
    });
  } else {
    res.render('index', { title : "Not logged in", loggedin: false });
  }
  // res.render('index',
  // { title : 'Home' }
  // );
});

app.get('/partials/:name', function(req, res){
  var name = req.params.name;
  res.render('partials/' + name);
});

app.get('/oauth', function(req, res) {
  var client = new Evernote.Client({
    consumerKey: config.API_CONSUMER_KEY,
    consumerSecret: config.API_CONSUMER_SECRET,
    sandbox: config.SANDBOX
  });

  client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret, results){
    if(error) {
      req.session.error = JSON.stringify(error);
      res.redirect('/');
    }
    else {
      // store the tokens in the session
      req.session.oauthToken = oauthToken;
      req.session.oauthTokenSecret = oauthTokenSecret;

      // redirect the user to authorize the token
      res.redirect(client.getAuthorizeUrl(oauthToken));
    }
  });

});
app.get('/oauth_callback', function(req, res) {
  var client = new Evernote.Client({
    consumerKey: config.API_CONSUMER_KEY,
    consumerSecret: config.API_CONSUMER_SECRET,
    sandbox: config.SANDBOX
  });

  client.getAccessToken(
    req.session.oauthToken,
    req.session.oauthTokenSecret,
    req.param('oauth_verifier'),
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if(error) {
        console.log('error');
        console.log(error);
        res.redirect('/');
      } else {
        // store the access token in the session
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTtokenSecret = oauthAccessTokenSecret;
        req.session.edamShard = results.edam_shard;
        req.session.edamUserId = results.edam_userId;
        req.session.edamExpires = results.edam_expires;
        req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
        req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
        res.redirect('/');
      }
    });
});
app.get('/clear', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.post('/export', function(req, res) {
  if(req.session.oauthAccessToken) {
    var token = req.session.oauthAccessToken;
    var note = new Evernote.Note();
    var nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
    nBody += "<en-note>";

    for (var i=0; i<req.body.length;i++) {
        var obj = req.body[i];
        nBody += "<br>";
        nBody += obj.description;
        nBody += "</br>";
    }

    nBody += "</en-note>";
    note.title = "Shopping List";
    note.content = nBody;
    var client = new Evernote.Client({
      token: token,
      sandbox: config.SANDBOX
    });
    var noteStore = client.getNoteStore();
    //noteStore.createNote(token, note);
    noteStore.createNote(token, note, function(err, notebooks){
      console.log(err);
      //req.session.notebooks = notebooks;
      //res.render('index', { title : "Logged in", loggedin: true });
    });
  }
});

app.listen(3000);
