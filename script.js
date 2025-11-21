let expressions = [''];
const priority = ['*','/','+','-'];

function type (input) {
    let inputBox = document.getElementById("inputBox");
    inputBox.innerHTML+=input + " ";
    if (priority.includes(input)){
        expressions[count] += input;
        count++;
    }
}
function solve(){
    for(let i = 0; i < list.length; i++) {
        for(let j = 0; j < expressions.length;j++) {
            if()expressions[j] += list.charAt(i);
        }
    }
}