const ioHook = require("iohook");
const player = require("play-sound")((opts = {}));

const limit = 10000;
const checkInterval = 1000;
var last = Date.now();

const alert = "alert.wav";

function check() {
    if (Date.now() - last >= limit) {
        player.play(alert, err => {
            if (err) console.log(err);
        });
    }
}

function event(e) {
    last = Date.now();
}

ioHook.on("mousemove", event);
ioHook.on("mouseclick", event);
ioHook.on("mousewheel", event);
ioHook.on("keydown", event);
ioHook.on("keyup", event);

setInterval(check, checkInterval);

ioHook.start();
