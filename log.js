const fs = require("fs");
const path = require("path");

const foldername = path.join(__dirname, "/log/");
const filename = path.join(foldername + Date.now().toString() + ".json");

var log = [];

setInterval(save, 10000);

function logger(e) {
    log.push(e);
}

function save() {
    if (!fs.existsSync(foldername)) fs.mkdirSync(foldername);

    fs.writeFileSync(filename, JSON.stringify(log));
}

module.exports = logger;
