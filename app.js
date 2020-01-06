const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const KoaStatic = require('koa-static');
const path = require('path');
const koaBody = require('koa-body');
const logger = require('koa-logger')
const index = require('./routes/index')
var cors = require('koa2-cors');

// error handler
onerror(app)

// middlewares

app.use(koaBody({
  multipart:true, // 支持文件上传
  // encoding:'gzip',
  formidable:{
    // uploadDir:'./public/upload/', // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 5 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));

app.use(json())
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 解决跨域问题
app.use(cors());
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', '*');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   ctx.set('Cache-Control', 'no-cache');
//   ctx.set('Access-Control-Allow-Credentials', 'true'); 
//   ctx.set('Content-Type', 'application/json');
//   await next();
// })

app.all('*', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Cache-Control","no-store");//304
  await next();
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 用户拦截器，拦截非法请求，未携带token的请求
const filteredRequest = ['/api/v1/user/login', '/api/v1/user/create' ,'/api/v1/user/resetPasswordWithoutLogin']
app.use(async (ctx, next) => {
  if(filteredRequest.includes(ctx.url)) {
    await next()
  }
  else {
    if(ctx.request.headers && ctx.request.headers.token) {
      await next()
    }
    else {
      await next()
      // ctx.body = {
      //     code: 401,
      //     msg: '未授权的用户行为，请重新登录',
      //     data: null
      // }
    }
  }
})

// 配置静态资源 访问
app.use(KoaStatic(
    path.join( __dirname)
))
app.use(index.routes(), index.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
