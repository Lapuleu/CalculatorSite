let expressions = [];
const priority = ['^','*','/','+','-'];
let current = "";
let statement = true;
let inputBox;
let fileInput = [];
function init() {
    inputBox = document.getElementById("inputBox");
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function clearInput() {
    console.log("clearing");
    inputBox.value = "";
    expressions = [];
    current = "";
}
function round() {
    let val = parseFloat(inputBox.value);
    if (!isNaN(val)) {
        inputBox.value = Math.round(val);
        expressions = [Math.round(val)];
        current = "";
    } else {
        console.error('round(): inputBox value is not a valid number');
    }
}

function enter(input) {
    let expression = document.getElementById(input).innerHTML;
    if (!statement){
        if(!priority.includes(expression)) {
            inputBox.value = "";
            expressions = [];
        }
    }
    inputBox.value += expression;
    statement = true;
    if(priority.includes(expression)) {
        if (current == ""){
            expressions.push(expression);
        } else {
            expressions.push(current);
            expressions.push(expression);
            current = "";
        }
    } else {
        current += input;
    }
    console.log(expressions);
}
function stat(m){
    if (fileInput.length == 0){
        console.error("No data loaded from file");
        return;
    }
    fileInput.sort((a,b) => a - b);
    let sum = parseFloat(fileInput[0]);
    let mostFrequent = [fileInput[0], 1];
    currentFrequency = 0;
    for (let i = 1; i < fileInput.length; i++){
        sum += parseFloat(fileInput[i]);
        if (fileInput[i] == fileInput[i - 1]){
            currentFrequency += 1;
            if (currentFrequency > mostFrequent[1]){
                mostFrequent = [fileInput[i], currentFrequency];
                currentFrequency = 0;
            }
        } else {
            currentFrequency = 0;
        }
    }
    let mean = sum / fileInput.length;
    let median = fileInput.sort((a,b) => a - b);
    if (fileInput.length % 2 == 0){
        median = (parseFloat(median[fileInput.length / 2 - 1]) + parseFloat(median[fileInput.length / 2])) / 2;
    } else {
        median = parseFloat(median[Math.floor(fileInput.length / 2)]);
    }
    let mode = mostFrequent[0];
    clearInput();
    if (m == 'mean'){
        inputBox.value = mean;
    } else if (m == 'median'){
        inputBox.value = median;
    } else {
        inputBox.value = mode;
    }
}
function solve(){
    expressions.push(current);
    console.log(expressions);
    for(let i = 0; i < priority.length;i++) {
        while (expressions.includes(priority.at(i))) {
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
    if (expressions.length > 1){
        expressions = expressions[0];
    }
    inputBox.value = expressions;
    statement = false;
    current = "";
}
function checkFileProperty(){
  console.log("checking file");
  let x = document.getElementById("fileToLoad");
  let txt = "";
  if ('files' in x) {
    if (x.files.length == 0) {
       txt = "Select one or more files...";
    } else {
       loadFileAsText();
    }
  } 
  else {
    if (x.value == "") {
      txt += "Select one or more files...";
    } else {
      txt += "The files property is not supported by your browser!";
      txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
    }
  }
  document.getElementById("Message").innerHTML = txt;
}
function loadFileAsText() {
  console.log("loading file");
  let fileToLoad = document.getElementById("fileToLoad").files[0];

  let fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) 
  {
    let textFromFileLoaded = fileLoadedEvent.target.result;
    document.getElementById("fileInput").value = textFromFileLoaded;
    fileInput = document.getElementById("fileInput").value.split(",");
    console.log(fileInput);
  };
  
  fileReader.readAsText(fileToLoad, "UTF-8");
}
