let expressions = [];
const priority = ['^','*','/','+','-'];
let current = "";
let inputBox = document.getElementById("inputBox");

function enter(input) {
    let expression = document.getElementById(input).innerHTML
    inputBox.value+= expression;
    if(priority.includes(expression)) {
        expressions.push(current);
        expressions.push(expression);
        current = "";
    } else {
        current += input;
    }
    console.log(expressions);
}
function solve(){
    expressions.push(current);
    console.log(expressions);
    for(let i = 0; i < 4;i++) {
        if(expressions.includes(priority.at(i))) {
            console.log(i);
            let position = expressions.findIndex(pointer => pointer == priority.at(i));
            let before = position - 1;
            let after = position + 1;
            let answer = 0;
            console.log(expressions);
            console.log(i);
            if(i == 0){
                answer = Math.pow(expressions[before],expressions[after]);
            }
            else if(i == 1) {
                console.log(i);
                answer = expressions[before] * expressions[after];
                console.log(answer);
            } else if(i == 2) {
                console.log(i);
                answer = expressions[before] / expressions[after];
                console.log(answer);
            } else if(i == 3) {
                console.log(i);
                answer = parseFloat(expressions[before]) + parseFloat(expressions[after]);
                console.log(answer);
            } else {
                console.log(i);
                answer = expressions[before] - expressions[after];
                console.log(answer);
            }
            expressions.splice(before,3,answer);
            console.log(expressions);
        }
    }
    inputBox = "";
}
