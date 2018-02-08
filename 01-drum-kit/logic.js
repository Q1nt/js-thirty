const symbols = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const sounds_path = 'sounds/';
const sounds_extension = '.wav';
const sounds = [
    'sounds/boom.wav',
    'sounds/clap.wav',
    'sounds/hihat.wav',
    'sounds/kick.wav',
    'sounds/openhat.wav',
    'sounds/ride.wav',
    'sounds/snare.wav',
    'sounds/tink.wav',
    'sounds/tom.wav'
];

var key_press_functions = {};

var keys = document.createElement('div');
keys.className = 'keys';
document.body.appendChild(keys);

symbols.forEach(function (value, index) {
    var sound_path = sounds[index];
    var key_element = create_sound_button_element(value, sound_path);

    key_press_functions[value] = function () {
        play_audio(sound_path);
    };

    keys.appendChild(key_element);
});

window.addEventListener('keypress', function (event) {
    console.log(event);
    var key = event.key || event.which || event.keyCode;
    console.log('pressed:', key);
    key_press_functions[key]();
});

function create_sound_button_element(symbol, sound) {
    var title_element = document.createElement('kbd');
    title_element.innerText = symbol.toUpperCase();

    var sound_element = document.createElement('span');
    sound_element.className = 'sound';
    sound_element.innerText = extract_sound_name(sound);

    var key_element = document.createElement('div');
    key_element.className = 'key';
    key_element.appendChild(title_element);
    key_element.appendChild(sound_element);

    return key_element
}

function extract_sound_name(sound_path) {
    return sound_path.replace(sounds_path, '').replace(sounds_extension, '');
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
