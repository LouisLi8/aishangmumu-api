const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const koaBody = require('koa-body');

const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/user')
const media = require('./routes/media')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// app.use(async ctx => {
//   ctx.body = ctx.request.body;
// })
// app.use(koaBody({
//   multipart:true, // 支持文件上传
//   encoding:'gzip',
//   formidable:{
//     uploadDir:'./public/upload/', // 设置文件上传目录
//     keepExtensions: true,    // 保持文件的后缀
//     maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
//     onFileBegin:(name,file) => { // 文件上传前的设置
//       // console.log(`name: ${name}`);
//       // console.log(file);
//     },
//   }
// }));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 解决跨域问题
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Cache-Control', 'no-cache');
  ctx.set('Content-Type', 'application/json');
  await next();
})
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(media.routes(), media.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
