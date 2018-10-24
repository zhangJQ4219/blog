let express = require('express');
let path = require('path');
let fs = require('fs')
// 路由配置入口
let indexRouter = require('./routes/index');
let articleRouter = require('./routes/article');
let loginRouter = require('./routes/login');
let pageRouter = require('./routes/page');
let userinfoRouter = require('./routes/userinfo');

let app = express();

// 数据库
let mongoose = require('./config/mongoose.js')
let db = mongoose()

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

// 静态资源库
app.use("/upload",express.static('./upload'))
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})

//服务端设置跨域
app.all('/*', (req, res, next) => {
  //告诉浏览器一些额外信息
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("X-Powered-By", ' 3.2.1')
  res.setHeader("Content-Type", "application/json;charset=utf-8")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Methods", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token")
  res.setHeader("Access-Control-Expose-Headers", "*")
  res.setHeader("Access-Control-Max-Age", "2592000")
  if(req.method === 'OPTIONS') {
    res.sendStatus(204)
  } else {
    next()
  }
})

// 路由访问
app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/', loginRouter);
app.use('/', pageRouter);
app.use('/userinfo', userinfoRouter);

module.exports = app;
