/* 
 - to do add errorlist to programma
 - filter out correct answers for source list 
*/
var group = ["Structural", "Creational", "Behavioral"];
var myList = [
    ["Adapter", group[0]],
    ["Bridge", group[0]],
    ["Composite", group[0]],
    ["Flyweight", group[0]],
    ["Proxy", group[0]],
    ["Builder", group[1]],
    ["Factory", group[1]],
    ["Abstract Factory", group[1]],
    ["Singleton", group[1]],
    ["Prototype", group[1]],
    ["Chain of responsibility", group[2]],
    ["Command", group[2]],
    ["Iterator", group[2]],
    ["Mediator", group[2]],
    ["Memento", group[2]],
    ["Observer", group[2]],
    ["Strategy", group[2]],
    ["State", group[2]],
    ["Interperter", group[2]],
    ["Template", group[2]],
    ["Visitor", group[2]]
];

var myErrorList = new Array();

var question;
var Answer;
var ButtonBoard;
var pList;
var pListLenght;
var pErrorList;

window.onload = function main() {
    pAnswer = document.getElementById('pAnswer');
    ButtonBoard = document.getElementById("ButtonBoard");
    pList = document.getElementById('pList');
    pListLenght = document.getElementById('pListLenght');
    pErrorList = document.getElementById('pErrorList');
    pErrorList.style.visibility = "hidden";

    pListLenght.innerHTML = "Number of items to go: " + myList.length;
    group.forEach(element => {
        var btn = document.createElement("BUTTON");
        btn.textContent = element;
        btn.setAttribute('id', 'btn' + element);
        btn.setAttribute('onclick', 'print(\'' + element + '\')'); /*JavaScript String Escape / Unescape*/

        ButtonBoard.appendChild(btn);
    });
}

function print(element) {

    if (this.Answer == element) {
        console.log("Correct");
        pAnswer.innerHTML = "CORRECT";
        console.log("Number of list items to go: " + myList.length);
        myList.splice(get2dArrayIndexOf(myList, question[0]), 1);
        pAnswer.style.color = "green";

    } else {
        console.log("ERROR");
        pAnswer.innerHTML = "ERROR";
        pAnswer.style.color = "red";
        /*add to ERROR list if new reccord*/
        if (myErrorList.indexOf(question) === -1) {
            myErrorList.push(question);
            //console.log("Error list " + myErrorList.toString());
            pErrorList.innerHTML = pErrorList.innerHTML + "<br>" + "- " + question;
        }

    }

    pListLenght.innerHTML = "Number of items to go: " + myList.length;
    setButtonActive(true);

}

function get2dArrayIndexOf(arr, string) {
    var counter = -1;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i][0] == string) {
            counter = i;
        }
    }
    return counter;
}

function setButtonActive(boolean) {
    group.forEach(element => {
        document.getElementById("btn" + element).disabled = boolean;
    });
}

function nextQuestion() {
    if (myList.length > 0) {
        this.question = myList[getRandomTo(myList.length)];
        this.Answer = question[1];

        console.log("Test Next question: " +
            "\n Design Patterns : " + this.question[0] +
            "\n Group: " + this.Answer
        );

        pList.innerHTML = this.question[0];
        pAnswer.style.color = "white";
        pAnswer.innerHTML = "..................";

        setButtonActive(false);
    } else {
        pAnswer.innerHTML = "Well done, you have finished your list. We have added a list of your mistakes"
        myList = myErrorList;
        pListLenght.innerHTML = "Number of items to go: " + myList.length;

    }
}

function getRandomTo(max) {
    return Math.floor(Math.random() * Math.floor(max));

}

function btnErrorList() {
    if (pErrorList.style.visibility == "visible") {
        pErrorList.style.visibility = "hidden";
    } else {
        pErrorList.style.visibility = "visible";
    }
}