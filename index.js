/* 
 - to do add errorlist to programma
 - filter out correct answers for source list 
*/
var myList = [
    ["Adapter", "Structural", "Een ontwerppatroon met als doel om niet compatible code toch te laten samenwerken door methodes op te roepen in anders gelabelde methodes."],
    ["Bridge", "Structural", "Het geleidelijk toevoegen van functionaliteiten terwijl te grote verschillen worden gescheiden met behulp van abstracte klassen."],
    ["Composite", "Structural", "Een klasse die objecten samenstelt in boomstructuren om hiërarchieën te vertegenwoordigen."],
    ["Flyweight", "Structural", "Een ontwerppatroon dat erg handig is voor het aanmaken van een grootte hoeveelheid gelijkaardige objecten."],
    ["Proxy", "Structural", "Een klasse die de toegang beperkt tot een andere klasse."],
    ["Builder", "Creational", "Een ontwerppatroon voor het maken van objecten die bestaan uit een reeks andere objecten."],
    ["Factory", "Creational", "Een ontwerppatroon waarmee u een interface voorziet voor het aanmaken van objecten in een gedeelde superklasse."],
    ["Abstract Factory", "Creational", "Een interface voor het maken van families van gerelateerde of afhankelijke objecten zonder hun concrete klassen op te geven."],
    ["Singleton", "Creational", "Een ontwerppatroon die het onmogelijk maakt om meer dan één instantie te hebben van een klasse."],
    ["Prototype", "Creational", "Een ontwerppatroon voor het maken van objecten opbasis van het kopiëren van andere objecten. "],
    ["Chain of responsibility", "Behavioral", "Een ontwerppatroon waarbij men data naar een object stuurt en deze gaat bepalen of het de code kan uitvoeren of moet doorgeven aan een volgende handeler object."],
    ["Command", "Behavioral", "Een ontwerppatroon dat via encapsulatie  toelaat om een lijst van code op te slagen en deze op een later tijdstip te laten uitvoeren."],
    ["Iterator", "Behavioral", "Een ontwerppatroon waarmee u elementen van een verzameling kunt doorlopen zonder de onderliggende collectie weer te geven. (lijst, stapel, boom, enz.) "],
    ["Mediator", "Behavioral", "Een ontwerppatroon waarmee u de communicatie tussen afhankelijke objecten kunt regelen zonder dat de objecten met elkaar  ooit in contact komen."],
    ["Memento", "Behavioral", "Het ontwerppatroon dat undo actie mogelijk maakt door middel van toestanden van het object tijdelijk op te slagen."],
    ["Observer", "Behavioral", "Wordt gebruikt wanneer een groot aantal andere objecten geüpdatet moeten worden wanneer een andere object verandert."],
    ["Strategy", "Behavioral", "Een patroon die een methode laat variëren onafhankelijk van klanten die het gebruiken."],
    ["State", "Behavioral", "Een ontwerppatroon waarmee een object zijn gedrag kan veranderen wanneer zijn interne toestand verandert. Het lijkt alsof het object van klasse is veranderd."],
    ["Template", "Behavioral", "Een ontwerppatroon dat het skelet van een algoritme in de superklasse definieert, maar subklassen specifieke stappen van het algoritme laat overschrijven zonder de structuur ervan te veranderen"],
    ["Visitor", "Behavioral", "Een ontwerppatroon waarmee u algoritmen kunt scheiden van de objecten waarop ze werken."]
];

var myErrorList = new Array();
var uniqueColumn;
var questionRow;
var question;
var Answer;
var ButtonBoard;
var pList;
var pListLenght;
var pErrorList;
var QuestionTypeBoard;
var questionType;

window.onload = function main() {
    pAnswer = document.getElementById('pAnswer');
    ButtonBoard = document.getElementById("ButtonBoard");
    pList = document.getElementById('pList');
    pListLenght = document.getElementById('pListLenght');
    pErrorList = document.getElementById('pErrorList');
    pErrorList.style.visibility = "hidden";
    QuestionTypeBoard = document.getElementById('SetQuestionTypeBoard');
    pListLenght.innerHTML = "Number of items to go: " + myList.length;
    ButtonBoard.style.display = "none"; //neemt geen plek in op het scherm
}

function setQuestionType(type) {
    SetQuestionTypeBoard.style.display = "none";
    questionType = type;
    if (type == 'c') {
        console.log("C");
        uniqueColumn = [...new Set(myList.map(item => item[1]))]; //set answer buttons

    } else if (type == 'o') {
        console.log("O");
        uniqueColumn = [...new Set(myList.map(item => item[0]))]; //set answer buttons


    } else {
        console.log("ERROR AT SET QUESTION TYPE");
    }
    createBtn(uniqueColumn)
    ButtonBoard.style.display = "inline";
    nextQuestion();
}

function createBtn(uniqueColumn) {
    uniqueColumn.forEach(element => {
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
        myList.splice(get2dArrayIndexOf(myList, questionRow[0]), 1);
        pAnswer.style.color = "green";

    } else {
        console.log("ERROR");
        pAnswer.innerHTML = "ERROR";
        pAnswer.style.color = "red";
        /*add to ERROR list if new reccord*/
        if (myErrorList.indexOf(question) === -1) {
            myErrorList.push(questionRow);
            //console.log("Error list " + myErrorList.toString());
            pErrorList.innerHTML = pErrorList.innerHTML + "<br>" + "- " + question + " : " + Answer;
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
    uniqueColumn.forEach(element => {
        document.getElementById("btn" + element).disabled = boolean;
    });
}

function nextQuestion() {
    console.log("test: ");
    if (myList.length > 0) {
        this.questionRow = myList[getRandomTo(myList.length)];

        if (questionType == "o") {
            console.log("questionRow: " + this.questionRow[2]);
            this.question = this.questionRow[2]; // set question
            this.Answer = this.questionRow[0]; //set Answer
        } else if (questionType == "c") {
            console.log("questionRow: " + this.questionRow[2]);
            this.question = this.questionRow[0]; // set question
            this.Answer = this.questionRow[1]; //set Answer
        } else {
            console.log("ERROR AT NEXTQUESTION FUNCTION")
        }
        pList.innerHTML = this.question;


        console.log("Test Next question: " +
            "\n Design Patterns : " + this.question +
            "\n uniqueColumn: " + this.Answer
        );

        pAnswer.style.color = "white";
        pAnswer.innerHTML = "..................";

        setButtonActive(false);
    } else {
        if (myErrorList.length > 0) {
            pAnswer.innerHTML = "Well done, you have finished your list. We have added a list of your mistakes"
        } else {
            pAnswer.innerHTML = "Well done, you have finished this exercise."
        }
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