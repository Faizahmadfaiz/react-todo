/*var person = ['Andrew', 25];
var person2 = ['Jen', 29];

fun(...person);
function fun(name, age) {
    console.log(`Hi ${name}! You are ${age}`);
}*/

var names = ['Mikes', 'Ben'];
var final = ['Andrew', ...names];

final.forEach((name) => console.log(`Hi ${name}`));