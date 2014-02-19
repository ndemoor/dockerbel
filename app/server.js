var express = require('express'),
    Memcached = require('memcached');

// Constants
var port = 3000;
var env = process.env.NODE_ENV || 'production';
var mc = new Memcached(process.env.MC_PORT.replace('tcp://', ''));

// App
var app = express();
app.use(express.urlencoded());

app.get('/', function (req, res) {
  res.send('Hello World!!\n');
});

app.post('/test', function (req, res) {
  mc.set('foo', req.body.value, 3600, function (err) {
    if(err) {
      res.send('Could not set value\n', 500);
    } else {
      res.send('Value set!\n')
    }
  });
});

app.get('/test', function (req, res) {
  mc.get('foo', function (err, data) {
    if(err) {
      res.send('Could not get value\n', 500);
    } else {
      res.send('Value = ' + data + '\n');
    }
  });
});

app.listen(port)
console.log('Running in ' + env + ' on http://localhost:' + port);
