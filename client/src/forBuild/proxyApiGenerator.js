var fs = require('fs');
var process = require('process');

fs.writeFile("./src/forBuild/proxyApi.js","export default '" + process.env.PROXY_API +"'", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 