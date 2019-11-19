let client = require("scp2");
let { secret } = require("./secret");

//
// secret.js 格式
//
// const secret = {
//   host: "xx.xxx.xxx.xx",
//   username: "root",
//   password: "password",
//   path: "/root/myapp/tools/"
// };
//
// exports.secret = secret;
//

//scp覆盖上传整个目录
client.scp(
  "dist/",
  // "2.txt",
  {
    host: secret.host,
    username: secret.username,
    password: secret.password,
    path: secret.path
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("tools update success");
    }
  }
);
