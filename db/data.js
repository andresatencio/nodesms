var data = {
   db: { native_parser: false },
   server: { poolSize: 2 },
   user: process.env.NODESMS_USER,
   pass: process.env.NODESMS_PASS,
   uri: process.env.NODESMS_URI
}

module.exports = data;


