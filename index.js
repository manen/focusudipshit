const ioHook = require("iohook");

const limit = 10000;
var last = Date.now();

function check() {
    if (Date.now() - last >= limit) {
        console.log("Work u pig");
    }
}

function event(e) {
    last = Date.now();
}

ioHook.on("mousemove", event);

ioHook.on("keydown", event);

setInterval(check, 100);

ioHook.start();
