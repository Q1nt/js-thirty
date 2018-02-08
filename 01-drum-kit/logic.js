const symbols = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const sounds = ['boom', 'clap', 'hihat', 'kick', 'openhat', 'ride', 'snare', 'tink', 'tom'];

if (symbols.length !== sounds.length) {
    console.error('unequal number of sounds and symbols!')
}

const key_press_functions = {};

const animation_class_name = 'playing';

// create root div with for key elements
const keys = create_and_append_element('div', document.body, null, 'keys');

// populates body with 'key' divs and register handler functions to play sounds
symbols.forEach(function (symbol, index) {
    const sound = sounds[index];
    const key_element = create_and_append_element('div', keys, null, 'key');
    create_and_append_element('kbd', key_element, symbol.toUpperCase(), null);
    create_and_append_element('span', key_element, sound, 'sound');
    register_key_press_function(symbol, sound, key_element);
    cleanupAnimationAtEnd(key_element);
});

register_key_press_listener();

console.log('app initialized :)');

function register_key_press_function(key_code, sound, key_element) {
    const key_press_function = () => {
        play_audio(`sounds/${sound}.wav`);
        triggerAnimation(key_element)
    };

    key_press_functions[key_code.toLowerCase()] = key_press_function;
    key_press_functions[key_code.toUpperCase()] = key_press_function;
}

function triggerAnimation(element) {
    element.classList.add(animation_class_name);
}

function cleanupAnimationAtEnd(element) {
    element.addEventListener('transitionend', function (event) {
        if (event.propertyName === 'transform') {
            element.classList.remove(animation_class_name)
        }
    })
}

function play_audio(sound_path) {
    const audio = new Audio(sound_path);
    audio.currentTime = 0; // rewind to start
    audio.play()
        .then(() => console.log(`played sound at ${sound_path}`))
        .catch((reason) => console.log(`something bad happened: ${reason}`))
}

function register_key_press_listener() {
    window.addEventListener('keypress', function (event) {
        const key = event.key;
        if (key in key_press_functions) {
            key_press_functions[key]();
        } else {
            console.log(`no handler defined for key: ${key}`);
        }
    });
}

function create_and_append_element(tag, parent, inner_text, class_name) {
    const element = document.createElement(tag);
    if (inner_text) element.innerText = inner_text;
    if (class_name) element.className = class_name;
    if (parent) parent.appendChild(element);
    return element;
}
