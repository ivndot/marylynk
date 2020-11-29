// definicion de variables
const foco1 = document.querySelector("div.foco1");
const foco2 = document.querySelector("div.foco2");
const message = document.querySelector("p.message");
const res = document.querySelector("p.res");
const mary = document.querySelector("div.nat");
//puertas
const door_bathroom = document.querySelector("#d-bathroom");
const door_bedroom = document.querySelector("#d-bedroom");
const door_kitchen = document.querySelector("#d-kitchen");
//focos
const focus_bathroom = document.querySelector("div.l-bathroom");
const focus_kitchen = document.querySelector("div.l-kitchen");
const focus_bedroom = document.querySelector("div.l-bedroom");
const focus_dining_room = document.querySelector("div.l-dining_room");
const focus_living_room = document.querySelector("div.l-living_room");
let isMary = false;

//definicion de speech recognition
var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

//creamos gramatica prender | apagar
var grammar =
    "#JSGF V1.0;" /*cabecera, se define la version de jspeech grammat format */ +
    "grammar test;" /*nombre de la gramatica -action-*/ +
    //definiendo gramatica pulica
    "public <action> = (mary | Mary) (turn on | turn off) lights kitchen;"; //se convierte el arreglo en un string separado por |

//obejto speech recognition
var recognition = new SpeechRecognition();
//objeto speech grammar list
var speechRecognitionList = new SpeechGrammarList();
//se añade la gramatica definida a la lista con un grado de importancia mayor(1)
speechRecognitionList.addFromString(grammar, 1);

//le asignamos la lista de gramaticas a reconocer
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.maxAlternatives = 1;

//empieza el reconocimiento con el button
mary.addEventListener("click", (e) => {
    console.log(e);
    //permisos de captura de audio
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
            recognition.start();
        })
        .catch(function (err) {
            message.innerHTML =
                "No puedo usar el micrófono, dáme permisos para que funcione!";
        });
});

recognition.addEventListener("result", (event) => {
    const action = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
    if (event.results[0].isFinal) {
        message.innerHTML = action;
    }
    console.log(event.results);
    //definicion de regex
    const command = /mary|Mary/;
    const expression = /((turn on|turn off)\s(lights|TV)\s(bathroom|bedroom|kitchen|living room|dining room))|(open|close)\sthe\sdoor\s(kitchen|bedroom|bathroom)/;
    maryAsistance(action, command, expression);
});

//cuando se terminan el reconocimiento
recognition.addEventListener("end", () => {
    recognition.start();
});

//cuando se deja de recibir audio entendible o no entendible
recognition.onspeechend = () => {
    message.innerHTML = "dejo de escuchar";
};

//funcion de la logica de mary
function maryAsistance(action, command, expression) {
    if (command.test(action)) {
        //animacion con sonido
        mary.style.backgroundColor = "red";
        console.log(action);
        isMary = true;
    } else {
        //se dijo el commando mary anteriormente
        if (isMary) {
            res.innerHTML = action;
            const sentence = expression.exec(action);
            console.log(sentence);
            switch (sentence[0]) {
                /***************ligths**************/
                /*KITCHEN*/
                case "turn on lights kitchen":
                    focus_kitchen.style.backgroundColor = "rgba(0,0,0,0)";
                    break;
                case "turn off lights kitchen":
                    focus_kitchen.style.backgroundColor = "rgba(0,0,0,0.4)";
                    break;
                /*BATHROOM*/
                case "turn on lights bathroom":
                    focus_bathroom.style.backgroundColor = "rgba(0,0,0,0)";
                    break;
                case "turn off lights bathroom":
                    focus_bathroom.style.backgroundColor = "rgba(0,0,0,0.4)";
                    break;
                /*BEDROOM*/
                case "turn on lights bedroom":
                    focus_bedroom.style.backgroundColor = "rgba(0,0,0,0)";
                    break;
                case "turn off lights bedroom":
                    focus_bedroom.style.backgroundColor = "rgba(0,0,0,0.4)";
                    break;
                /*LIVING ROOM*/
                case "turn on lights living room":
                    focus_living_room.style.backgroundColor = "rgba(0,0,0,0)";
                    break;
                case "turn off lights living room":
                    focus_living_room.style.backgroundColor = "rgba(0,0,0,0.4)";
                    break;
                /*DINING ROOM*/
                case "turn on lights dining room":
                    focus_dining_room.style.backgroundColor = "rgba(0,0,0,0)";
                    break;
                case "turn off lights dining room":
                    focus_dining_room.style.backgroundColor = "rgba(0,0,0,0.4)";
                    break;
                /***************doors**************/
                /*KITCHEN*/
                case "open the door kitchen":
                    door_kitchen.style.transform = "rotate(215deg)";
                    door_kitchen.style.transition = "0.3s";
                    break;
                case "close the door kitchen":
                    door_kitchen.style.transform = "rotate(270deg)";
                    door_kitchen.style.transition = "0.3s";
                    break;
                /*BATHROOM*/
                case "open the door bathroom":
                    door_bathroom.style.transform = "rotate(215deg)";
                    door_bathroom.style.transition = "0.3s";
                    break;
                case "close the door bathroom":
                    door_bathroom.style.transform = "rotate(270deg)";
                    door_bathroom.style.transition = "0.3s";
                    break;
                /*BEDROOM*/
                case "open the door bedroom":
                    door_bedroom.style.transform = "rotate(215deg)";
                    door_bedroom.style.transition = "0.3s";
                    break;
                case "close the door bedroom":
                    door_bedroom.style.transform = "rotate(270deg)";
                    door_bedroom.style.transition = "0.3s";
                    break;
            }
            if (sentence[0] === "turn on lights kitchen") {
                /*foco1.style.backgroundColor = "yellow";
                foco2.style.backgroundColor = "yellow";*/
            }
            if (sentence[0] === "turn off lights kitchen") {
                /*foco1.style.backgroundColor = "black";
                foco2.style.backgroundColor = "black";*/
                focus_bathroom.style.backgroundColor = "rgba(0,0,0,0.4)";
            }

            if (sentence[0] === "close the door bathroom") {
                door_bathroom.style.transform = "rotate(270deg)";
                door_bathroom.style.transition = "0.3s";
            }

            if (sentence[0] === "open the door bathroom") {
                door_bathroom.style.transform = "rotate(215deg)";
                door_bathroom.style.transition = "0.3s";
            }
            isMary = false;
        }
    }
}
