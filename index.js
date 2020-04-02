const ioHook = require("iohook");
const player = require("play-sound")((opts = {}));

const limit = 10000;
var last = Date.now();

const alert = "alert.wav";

player.play(alert, err => {
    if (err) console.log(err);
});

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

ioHook.on("keydown", event);

setInterval(check, 500);

ioHook.start();
