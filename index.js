const fs = require("fs");

const ioHook = require("iohook");
const player = require("play-sound")((opts = {}));

const limit = 10000;
const checkInterval = 1000;
var last = Date.now();

var enabled = true;

const alertSound = "./assets/alert.wav";
const disableSound = "./assets/disable.wav";
const enableSound = "./assets/enable.wav";

const feedbackSound = "./assets/feedback.wav";

const enableLogging = true;
const log = enableLogging ? require("./log") : () => {};

function enable() {
    player.play(enableSound, err => {
        if (err) console.log(err);
    });
    enabled = true;
}

function disable() {
    player.play(disableSound, err => {
        if (err) console.log(err);
    });
    enabled = false;
}

function feedback() {
    player.play(feedbackSound, err => {
        if (err) console.log(err);
    });
}

var keybindPressed = false;
function keybind(e) {
    if (e.type == "keydown") {
        if (keybindPressed) {
            if (e.keycode == 19) {
                if (enabled) {
                    disable();
                } else {
                    enable();
                }
            }

            if (e.keycode == 32) {
                disable();
            }

            if (e.keycode == 18) {
                enable();
            }

            keybindPressed = false;
        }
        if (e.keycode == 16 && e.altKey && e.ctrlKey) {
            keybindPressed = true;
            feedback();
        }
    }
}

function check() {
    if (!enabled) return;
    if (Date.now() - last >= limit) {
        player.play(alertSound, err => {
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

console.log(fs.readFileSync("./help.txt").toString());
