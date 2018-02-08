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


var keys = document.createElement('div');
keys.className = 'keys';
document.body.appendChild(keys);

symbols.forEach(function (value, index) {
    var key_element = create_sound_button_element(value, sounds[index]);
    keys.appendChild(key_element);
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
