import animalsJson from "./tiere.json";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Game1() {
    const [animals, setAnimals] = useState(animalsJson);
    const [onboard, setOnboard] = useState();
    const [microfoneShown, setMicrofoneShown] = useState(false);
    const [lastWord, setLastWord] = useState();
    const [rulesShown, setRulesShown] = useState(false);
    const [guessed, setGuessed] = useState();
    const [error, setError] = useState();
    const [menu, setMenu] = useState(false);

    console.log(animals);

    // const said = useSelector(state =>
    //     state.said && state.said);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
        window.SpeechGrammarList || webkitSpeechGrammarList;
    // const SpeechRecognitionEvent =
    //     window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    useEffect(() => {
        console.log("UseEffect runs ");
    }, [onboard]);

    // var utterThis = new SpeechSynthesisUtterance(word);
    // utterThis.voice = voice;
    // synth.speak(utterThis);
    var lang = "de-De";
    // var supportedVoices = synth.getVoices();

    // var synth = window.speechSynthesis,
    //     word = document.getElementById("word"),
    //     voice = "",
    //     supportedVoices = [];

    // document.getElementById("say").onclick = function () {
    //     if (0 === supportedVoices.length) {
    //         var voices = synth.getVoices();
    //     }

    //     // поиск текущего языке в массиве supportedVoices
    //     for (var i = 0; i < voices.length; i++) {
    //         if (lang == voices[i].lang) {
    //             voice = voices[i];
    //         }
    //     }

    // // произношение текста
    // 

    let recognizer = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList();
    const tiere = [
        "Meerschweinchen",
        "Schaf",
        "Huhn",
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

    function onMenuClick() {
        console.log("CLICKED ON MENU");

        if (menu == false) {
            setMenu(true);
        } else {
            setMenu(false);
        }
    }
    function onClickAllListen() {
        setMicrofoneShown(true);
        console.log("Button clicked biatch");
        recognizer.start();
    }

    function onClickRules() {
        setRulesShown(true);
    }

    function clickOnX() {
        setRulesShown(false);
        console.log("Click on X");
    }

    function getAnimal(event) {
        const animalInGerman = event.target.name;
        console.log("It is Animal", animalInGerman);
        var utterThis = new SpeechSynthesisUtterance(animalInGerman);
        speechSynthesis.speak(utterThis);
    }

    // function allLevels() {
    //     document.getElementById("myDropdown").classList.toggle("show");
    // }

    // window.onclick = function (event) {
    //     if (!event.target.matches(".dropbtn")) {
    //         var dropdowns = document.getElementsByClassName("dropdown-content");
    //         var i;
    //         for (i = 0; i < dropdowns.length; i++) {
    //             var openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains("show")) {
    //                 openDropdown.classList.remove("show");
    //             }
    //         }
    //     }
    // };

    recognizer.onresult = function (event) {
        setMicrofoneShown(false);
        // const interim = event.result[0].transcript;
        // console.log("Промежуточный результат: ", interim);
        const result = event.results[0][0].transcript;
        let erraten = false;
        console.log("richtig erraten", result);
        setLastWord(result);

        for (let i = 0; i < tiere.length; i++) {
            if (result === tiere[i]) {
                erraten = true;
                setGuessed(true);
                animals.map((animal) => {
                    if (animal.name === tiere[i]) {
                        animal.onboard = true;
                        onboardedAnimals.push(animal);
                        setOnboard(animal);
                        console.log("NEW onboarded", onboardedAnimals);
                        console.log("NEW", animals);

                        setAnimals(animals);
                    }
                });
            }
        }

        if (!erraten) {
            console.log("probiere es noch einmal!");
            setGuessed(false);
            setError(true);
        }

        return animals;
    };
    console.log("!!!", animals);

    function hideMic() {
        setMicrofoneShown(false);
    }

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
                    {!microfoneShown && (
                        <img
                            onClick={onClickAllListen}
                            className="playButton"
                            src="go.png"
                        />
                    )}
                    {microfoneShown && (
                        <div>
                            <img className="listen" src="mic2.png" />
                            <button onClick={hideMic}>HIDE MIC</button>
                        </div>
                    )}

                    <div id="onTheTractor">
                        {onboardedAnimals.map((animal) => (
                            <img
                                id="onboardAnimals"
                                key={animal.name}
                                src={animal.img}
                            />
                        ))}
                    </div>
                    <img className="tracktor" src="tracktor.png" />
                </div>
                <div id="nav">
                    <div className="buttons">
                        <img src="menu_icon2.png" className="popupButton" />

                        <div className="dropdown">
                            <img
                                src="levels2.png"
                                className="popupButton"
                                onClick={onMenuClick}
                            />
                            {menu && (
                                <div
                                    id="myDropdown"
                                    className="dropdown-content"
                                >
                                    <a href="game1/easy">Easy</a>
                                    <a href="game1/normal">Normal</a>
                                    <a href="game1/hard">Hard</a>
                                </div>
                            )}
                        </div>
                        <div className="popup">
                            {!rulesShown && (
                                <img
                                    src="popup1.png"
                                    className="popupButton"
                                    onClick={onClickRules}
                                />
                            )}
                            {rulesShown && (
                                <p className="popuptext">
                                    Buddy, help me call all the animals home!
                                    <br></br> They only understand German, and I
                                    don`t speak German. <br></br>If you name the
                                    animal correctly, it will jump into the
                                    tractor by itself.
                                    <p id="close" onClick={clickOnX}>
                                        X
                                    </p>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="speakResult">
                        <p>You said:</p>
                        {lastWord && <h1>{lastWord}</h1>}
                        {guessed && (
                            <div>
                                <img className="yesNo" src="yes_icon.png" />
                                <p>Great!</p>
                            </div>
                        )}
                        {error && <h1>Try again!</h1>}
                    </div>
                    <h5>Call all the animals in German</h5>
                </div>
                <div id="animals">
                    <div className="animalsWrapper">
                        {offboardedAnimals.map((animal) => (
                            <img
                                name={animal.name}
                                key={animal.name}
                                src={animal.img}
                                onClick={getAnimal}
                            />
                        ))}
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
            */}
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
