

var app = require('express').createServer()
  , io = require('socket.io').listen(app)
  , routes = require('./routes')
  , contact = require('./models/contact');


// Routes: URL毎の処理
app.get('/', function (req, res) {



    contact.find({}, function(err, contacts) {
        if(err) throw err;
        res.render('index.ejs', {title: 'Express', contacts:contacts });
    }); 
});

app.get('/users', function (req, res) {
    res.render('users.ejs', {
        title: 'Express'
        , hoge : 'hoge'
    });
});

// 張られたコネクションに基づいた処理
io.sockets.on('connection', function (socket) {
    // clientから送られてきたメッセージの処理
    socket.on('chat', function ( chattext ) {
        var con = new contact();
        con.txt = chattext;
        con.save(function(err) {
            if(err) throw err;
        });

        socket.emit( 'message', { text: chattext }); // client にメッセージを送り返す
        socket.broadcast.emit( 'message', { text: chattext } ); // コネクション張っている全員にメッセージを送る
    });
});

app.listen(3000, function(){ });

// var mongo = require('mongodb');
// var db = new mongo.Db('chatlogDB', new mongo.Server('localhost', 3000, {}), {});
// db.open(function() {
//     db.collection('teacherCollection', function(err, collection) {
//         doc = {
//             "firstname" : "Taro",
//             "familyname" : "Yamada",
//             "age" : 42,
//             "work" : ["professor", "writer", "TV Caster"]
//         };
//         collection.insert(doc, function() {
//             console.log("insert success");
//             db.close();
//         });
//     });
// });


// /**
//  * Module dependencies.
//  */
// 
// var express = require('express')
//   , io = require('socket.io').listen(express)
//   , routes = require('./routes');
// 
// var app = module.exports = express.createServer();
// 
// // Configuration
// 
// app.configure(function(){
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'ejs');
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(__dirname + '/public'));
// });
// 
// app.configure('development', function(){
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });
// 
// app.configure('production', function(){
//   app.use(express.errorHandler());
// });
// 
// 
// // Routes
// 
// app.get('/', function( req, res ){
//   res.render('index', { title: 'Express' });
// });
// 
// 
// app.listen(3000, function(){
//   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
// });



// var app = require('express').createServer()
//   , io = require('socket.io').listen(app);
// 
// app.listen(80);
// 
// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.ejs');
// 
// });

// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

//  var express = require('express');
//  var app = express.createServer();
//  // 3000ポートでプログラムを動作させる
//  app.listen(3000);
//  
//  var io = require('socket.io').listen(80);
//  
//  io.sockets.on('connection', function (socket) {
//    socket.emit('news', { hello: 'world' });
//    socket.on('my other event', function (data) {
//      console.log(data);
//    });
//  });



//  // require.paths.push('/usr/local/lib/node_modules');
//  var express = require('express');
//  var app = express.createServer();
//  // 3000ポートでプログラムを動作させる
//  app.listen(3000);
//  // ソケットを作る
//  var socketIO = require('socket.io');
//  // クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
//  var socket = socketIO.listen(app);

//  // クライアントが接続してきたときの処理
//  sockets.on('connection', function(client) {
//    console.log(client.sessionId + 'が接続しました。');
//    // メッセージを受けたときの処理
//    client.on('message', function(msg) {
//      console.log(client.sessionId + "'がメッセージを送信しました。(" + msg + ")");
//      // つながっているクライアント全員に送信
//      client.send(msg);
//      client.broadcast(msg);
//    });
//    
//    // クライアントが切断したときの処理
//    client.on('disconnect', function(){
//      console.log(client.sessionId + 'が切断しました。');
//    });
//  });

//  // リクエストが来たら、index.ejsの内容をクライアントに出力する
//  app.get('/', function(req, res){
//    res.render('index.ejs', {
//      layout: false
//    });
//  });

