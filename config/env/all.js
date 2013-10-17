var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    ip: process.env.OPENSHIFT_NODEJS_IP || 127.0.0.1,
    port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
    db: process.env.OPENSHIFT_MONGODB_DB_URL
}
