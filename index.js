const ioHook = require("iohook");
const player = require("play-sound")((opts = {}));

const limit = 10000;
const checkInterval = 1000;
var last = Date.now();

var enabled = true;

const alert = "alert.wav";
const disable = "disable.wav";
const enable = "enable.wav";

function check() {
    if (!enabled) return;
    if (Date.now() - last >= limit) {
        player.play(alert, err => {
            if (err) console.log(err);
        });
    }
}

function event(e) {
    if (e.type == "keydown")
        if (e.keycode == 16 && e.altKey && e.ctrlKey) {
            if (enabled) {
                player.play(disable, err => {
                    if (err) console.log(err);
                });
                enabled = false;
            } else {
                player.play(enable, err => {
                    if (err) console.log(err);
                });
                enabled = true;
            }
        }
    last = Date.now();
}

ioHook.on("mousemove", event);
ioHook.on("mouseclick", event);
ioHook.on("mousewheel", event);
ioHook.on("keydown", event);
ioHook.on("keyup", event);

setInterval(check, checkInterval);

ioHook.start();
