import animalsJson from "./tiere.json";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Game1() {
    const [animals, setAnimals] = useState(animalsJson);
    console.log(animals);
    //const [onboard, setOnboard] = useState([]);

    // const said = useSelector(state =>
    //     state.said && state.said);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
        window.SpeechGrammarList || webkitSpeechGrammarList;
    // const SpeechRecognitionEvent =
    //     window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    let recognizer = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList();
    const tiere = [
        "Meerschweinchen",
        "Schaf",
        "Hahn",
        "Katze",
        "Ziege",
        "Pferd",
        "Kuh",
        "Schwein",
        "Hund",
        "Maus",
    ];
    const grammar =
        "#JSGF V1.0; grammar tiere; public <tiere> = ' + tiere.join(' | ') + ';";

    speechRecognitionList.addFromString(grammar, 1);

    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;
    recognizer.lang = "de-De";

    recognizer.grammars = speechRecognitionList;

    document.body.onclick = function () {
        recognizer.start();
        console.log("Ready to receive a command.");
    };

    recognizer.onresult = function (event) {
        const result = event.results[0][0].transcript;
        let erraten = false;
        console.log("richtig erraten", result);
        for (let i = 0; i < tiere.length; i++) {
            if (result === tiere[i]) {
                erraten = true;
                animals.map((animal) => {
                    if (animal.name === tiere[i]) {
                        animal.onboard = true;
                        console.log("NEW", animals);

                        setAnimals(animals);
                    }
                });
            }

            return;
        }

        if (!erraten) {
            console.log("probiere es noch einmal!");
        }
        setAnimals(animals);
        return animals;
    };
    console.log("!!!", animals);

    const offboardedAnimals = animals.filter((animal) => {
        if (animal.onboard === false) {
            return true;
        } else {
            return false;
        }
    });

    const onboardedAnimals = animals.filter((animal) => {
        if (animal.onboard === true) {
            return true;
        } else {
            return false;
        }
    });
    console.log("obboard", onboardedAnimals);
    return (
        <>
            <section id="pageGame1">
                <div id="onboard">
                    {onboardedAnimals.map((animal) => (
                        <img key={animal.name} src={animal.img} />
                    ))}
                </div>
                <div id="nav">
                    <p>Call all the animals in German</p>
                    {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
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
                        {offboardedAnimals.map((animal) => (
                            <img key={animal.name} src={animal.img} />
                        ))}
                        {/* <img src="svin.png" />
                        <img src="sharf.png" />
                        <img src="hahn.png" />
                        <img src="cat.png" />
                        <img src="ziege3.png" />
                        <img src="horse.png" />
                        <img src="kue.png" />
                        <img src="pig.png" />
                        <img src="dog.png" />
                        <img src="mause.png" /> */}
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
