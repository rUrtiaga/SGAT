var fs = require('fs');
var process = require('process');

let direccion = process.env.PROXY_API || 'http://localhost:3001';

fs.writeFile("./src/forBuild/proxyApi.js", "export default '" + direccion + "'", function (err) {
    if (err) {
        return console.log(err);
    } else {
        console.log(process.env.PROXY_API);
        console.log(`La direccion para request API (${direccion}) fue grabada éxitosamente`);
    }
});