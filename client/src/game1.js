import animals from "./tiere.json";
import { useState, useEffect } from "react";


export default function Game1() {
    console.log(animals);

    const [animal, setAnimals] = useState([]);
    const [onboard, setOnboard] = useState([]);

    // const SpeechRecognition =
    //     window.SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList =
        window.SpeechGrammarList || webkitSpeechGrammarList;
    // const SpeechRecognitionEvent =
    //     window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    var recognizer = new webkitSpeechRecognition();
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;
    recognizer.lang = "de-De";

    var grammar =
        "#JSGF V1.0; grammar animals; public <animal> = Bär | Ente | Esel | Hund | Kaninchen | Katze | Kuh | Pferd | Schaf | Schildkröte | Schwein | Ziege ;";
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognizer.grammars = speechRecognitionList;

    // recognizer.onresult = function (event) {
    //     var result = event.results[event.resultIndex];
    //     if (result.isFinal) {
    //         alert("Вы сказали: " + result[0].transcript);
    //     } else {
    //         console.log("Промежуточный результат: ", result[0].transcript);
    //     }
    // };
    // а если нажать на животное, то тебе скажут его имя.

    // SpeechRecognition.onstart (en-US) надо эту функцию, чтобы комп показал, что он слушает ребенка

    // Привязать это действие к нажатию кнопки на тракторе
    document.body.onclick = function () {
        recognizer.start();
        console.log("Ready to receive a command.");
    };

    recognizer.onresult = function (event) {
        const result = event.results[0][0].transcript;
        alert(result);
        return result;
    };

    // if result === tiere.json.name { setOnboard(onboard=result))}
        

    // вставить картинку, что процесс идет

    // function talk(){
    //     SpeechSynthesis.speak( new SpeechSynthesisUtterance(`Hund`));
    // }

    return (
        <>
            <section id="pageGame1">
                <div id="onboard">onboard</div>
                <div id="nav">
                    <p>Call all the animals in German</p>
                    <button id="recognize">Start</button>
                    <input id="interim" placeholder="Прогресс распознавания" />
                    <textarea
                        id="message"
                        placeholder="Окончательный результат"
                    ></textarea>
                </div>
                <div id="auto">
                    <img className="tracktor" src="tracktor.png" />
                </div>
                <div id="animals">
                    <div className="animalsWrapper">
                        <img src="svin.png" />
                        <img src="sharf.png" />
                        <img src="hahn.png" />
                        <img src="cat.png" />
                        <img src="ziege3.png" />
                        <img src="horse.png" />
                        <img src="kue.png" />
                        <img src="pig.png" />
                        <img src="dog.png" />
                        <img src="mause.png" />
                    </div>
                </div>
            </section>
            {/* <img className="1" src="1.png" />
            <p>Call all the animals in German</p>

            <button id="recognize">Start</button>

            <input id="interim" placeholder="Прогресс распознавания" />

            <textarea
                id="message"
                placeholder="Окончательный результат"
            ></textarea>
            <div className="animalsInTrack">
                <img className="tracktor" src="tracktor.png" />
            </div> */}
        </>
    );
}
