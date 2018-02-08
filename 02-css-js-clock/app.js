const second_hand = document.querySelector('.second-hand');
const minute_hand = document.querySelector('.min-hand');
const hour_hand = document.querySelector('.hour-hand');

const deg_per_second = 360/60;
const deg_per_minute = 360/60;
const deg_per_hour = 360/12;

const start_position_degree = 90;
update()

function update() {
    const now = new Date();
    rotate_element(now.getSeconds(), second_hand, deg_per_second);
    rotate_element(now.getMinutes(), minute_hand, deg_per_minute);
    rotate_element(now.getHours(), hour_hand, deg_per_hour);
}

function rotate_element(number, element, degrees_per_unit) {
    element.style.transform = `rotate(${start_position_degree + (number * degrees_per_unit)}deg)`;
}

setInterval(update, 1000);
