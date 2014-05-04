var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index',
  { title : 'Home' }
  );
});

app.get('/partials/:name', function(req, res){
  var name = req.params.name;
  res.render('partials/' + name);
});

app.listen(3000);
