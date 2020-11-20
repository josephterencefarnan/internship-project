var restify = require('restify');
var fs = require('fs');
const corsMiddleware = require('restify-cors-middleware')
function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}
function wash(req, res, next){
    fs.readFile(__dirname + '/../scripts/shampoo.csv', function(err, data) {
   if (err){
       return next(err);
   }     

let json = data
    .toString('utf8')
    .split(/[\n\r]+/)
    .map((line, i) => {
        if (i === 0) {
            // console.log("headers", line);
            // ignore
        } else {
            const [Month, Sales] = line.split(',');
            let [year, month] = Month.replace(/"/g, '').split('-');
            year = 2000 + parseInt(year, 10);
            let m = new Date(year, month);
            return {month: m, sales: parseFloat(Sales)};
        }
    })
    .filter((reading) => {
        return !!reading
    });
    res.send(200, json)
    })
}
var server = restify.createServer();

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://127.0.0.1:5500'],
})
 
server.pre(cors.preflight)
server.use(cors.actual)
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.get('/shampoo', wash)

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});