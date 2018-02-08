const symbols = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const sounds = ['boom', 'clap', 'hihat', 'kick', 'openhat', 'ride', 'snare', 'tink', 'tom'];

if (symbols.length !== sounds.length) {
    console.error('unequal number of sounds and symbols!')
}

const sounds_path = 'sounds/';
const sounds_extension = '.wav';

var key_press_functions = {};

// create root div with for key elements
var keys = create_and_append_element('div', document.body, null, 'keys');

// populates body with 'key' divs and register handler functions to play sounds
symbols.forEach(function (symbol, index) {
    var sound = sounds[index];
    var key_element = create_and_append_element('div', keys, null, 'key');
    create_and_append_element('kbd', key_element, symbol.toUpperCase(), null);
    create_and_append_element('span', key_element, sound, 'sound');
    register_key_press_function(symbol, sound, key_element)
});

register_key_press_listener();

console.log('app initialized :)');

function register_key_press_function(key_code, sound, key_element) {
    var key_press_function = function () {
        // todo: add animation
        play_audio(sounds_path + sound + sounds_extension)
    };

    key_press_functions[key_code.toLowerCase()] = key_press_function;
    key_press_functions[key_code.toUpperCase()] = key_press_function;
}

function play_audio(sound_path) {
    new Audio(sound_path).play()
        .then(function () {
            console.log('played:', sound_path)
        })
        .catch(function (reason) {
            console.log('something bad happened:', reason)
        })
}

function register_key_press_listener() {
    window.addEventListener('keypress', function (event) {
        var key = event.key;
        if (key in key_press_functions) {
            key_press_functions[key]();
        } else {
            console.log('no handler defined for key:', key);
        }
    });
}

function create_and_append_element(tag, parent, inner_text, class_name) {
    var element = document.createElement(tag);
    if (inner_text) element.innerText = inner_text;
    if (class_name) element.className = class_name;
    if (parent) parent.appendChild(element);
    return element;
}
