
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.configure(function(){
app.use(express.methodOverride());
app.use(express.bodyParser({keepExtensions:true,uploadDir:path.join(__dirname,'/public/uploads') }));

});

app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function whatever(request, response){
 console.log(request.files);
 var picture = '/uploads/' + path.basename(request.files.displayImage.path);
 response.render('brittany', { picture:picture, title: '*watermelon*'});
}

app.get('/', routes.index);
app.post('/whatever', whatever);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


