const ioHook = require("iohook");
const player = require("play-sound")((opts = {}));

const limit = 10000;
const checkInterval = 1000;
var last = Date.now();

var enabled = true;

const alert = "alert.wav";
const disable = "disable.wav";
const enable = "enable.wav";

const enableLogging = true;
const log = enableLogging ? require("./log") : () => {};

var keybindPressed = false;
function keybind(e) {
    if (e.type == "keydown") {
        if (keybindPressed) {
            if (e.keycode == 19) {
                if (enabled) {
                    e.keycode = 18;
                } else {
                    e.keycode = 32;
                }
            }

            if (e.keycode == 32) {
                player.play(disable, err => {
                    if (err) console.log(err);
                });
                enabled = false;
            }

            if (e.keycode == 18) {
                player.play(enable, err => {
                    if (err) console.log(err);
                });
                enabled = true;
            }

            keybindPressed = false;
        }
        if (e.keycode == 16 && e.altKey && e.ctrlKey) {
            keybindPressed = true;
        }
    }
}

function check() {
    if (!enabled) return;
    if (Date.now() - last >= limit) {
        player.play(alert, err => {
            if (err) console.log(err);
        });
    }
}

function event(e) {
    e = {
        ...e,
        time: Date.now()
    };
    keybind(e);
    log(e);
    last = Date.now();
}

ioHook.on("mousemove", event);
ioHook.on("mouseclick", event);
ioHook.on("mousewheel", event);
ioHook.on("keydown", event);
ioHook.on("keyup", event);
ioHook.on("mousedrag", event);

setInterval(check, checkInterval);

ioHook.start();
