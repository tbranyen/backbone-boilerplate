var connect = require('connect');
connect.createServer(connect.static(__dirname + '/..')).listen(1986);
require('fs').writeFileSync(__dirname + '/pid.txt', process.pid);
