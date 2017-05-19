const path = require('path');
const logger = require('morgan');
const pkg = require('./package');
const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./server/db/dbconfig');
const FileStore = require('session-file-store')(session);

const user = require('./server/routes/user');
const notes = require('./server/routes/notes');
const travels = require('./server/routes/travels');

const app = express();
const port = process.env.PORT || 3000
const db = mongoose.connect(config.mongodb);
// 数据库连接
db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
    console.log("------数据库连接成功！------");
});
// Use native promises
mongoose.Promise = global.Promise

// url请求解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//Session
const identityKey = 'identityKey'
app.use(session({
    name: identityKey,
    secret: 'cgc',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 30 * 60 * 1000 // 有效期，单位是毫秒
    }
}));

// 静态资源
app.use(express.static('static'))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// favicon
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// 设定路由
app.use('/api', user);
app.use('/api', notes);
app.use('/api', travels);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port, () => {
    console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app;
