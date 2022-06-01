import animalsJson from "./tiere.json";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function Game1() {
    const [animals, setAnimals] = useState(animalsJson);
    const [onboard, setOnboard] = useState([]);
    const [microfoneShown, setMicrofoneShown] = useState(false);
    const [lastWord, setLastWord] = useState();
    const [rulesShown, setRulesShown] = useState(false);
    const [guessed, setGuessed] = useState();
    const [error, setError] = useState();
    const [menu, setMenu] = useState(false);
    const history = useHistory();
    const [voice, setVoice] = useState({});
    const [level, setLevel] = useState(2);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
        window.SpeechGrammarList || window.webkitSpeechGrammarList;

    useEffect(() => {
        const win = onboard.length === 10;

        if (win) {
            const resetAnimals = animals.map(
                (animal) => (animal.onboard = false)
            );
            setAnimals(resetAnimals);
            setTimeout(() => {
                history.push("/victory");
            }, 1500);
        }
    }, [onboard]);

    useEffect(() => {
        const synth = window.speechSynthesis;
        synth.addEventListener("voiceschanged", () => {
            const voices = synth.getVoices();
            setVoice(voices[5]);
        });
    }, []);

    let recognizer = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList();

    const grammar =
        "#JSGF V1.0; grammar tiere; public <tiere> = ' + tiere.join(' | ') + ';";

    speechRecognitionList.addFromString(grammar, 1);

    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;
    recognizer.lang = "de-De";

    recognizer.grammars = speechRecognitionList;

    function onMenuClick() {
        if (menu == false) {
            setMenu(true);
        } else {
            setMenu(false);
        }
    }
    function onClickAllListen() {
        setMicrofoneShown(true);

        recognizer.start();
        setTimeout(() => {
            setMicrofoneShown(false);
        }, 6000);
    }

    function onClickRules() {
        setRulesShown(true);
    }

    function clickOnX() {
        setRulesShown(false);
    }

    function getAnimal(event) {
        const animalInGerman = event.target.name;
        var utterThis = new SpeechSynthesisUtterance(animalInGerman);

        const thisVoice = voice;

        utterThis.voice = thisVoice;
        speechSynthesis.speak(utterThis);
    }

    recognizer.onresult = function (event) {
        setMicrofoneShown(false);

        const result = event.results[0][0].transcript;
        let right = false;
        setLastWord(result);

        const newAnimals = animals.map((animal) => {
            if (animal.name === result && animal.level <= level) {
                animal.onboard = true;
                right = true;
                setGuessed(true);
                setError(false);
                setOnboard(onboardedAnimals());
            }
            return animal;
        });

        setAnimals(newAnimals);

        if (!right) {
            setGuessed(false);
            setError(true);
        }

        return animals;
    };

    function hideMic() {
        setMicrofoneShown(false);
    }

    let offboardedAnimals = animals.filter((animal) => {
        if (animal.onboard === false) {
            return true;
        } else {
            return false;
        }
    });

    let onboardedAnimals = () =>
        animals.filter((animal) => {
            if (animal.onboard === true || animal.level > level) {
                return true;
            } else {
                return false;
            }
        });

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
                        <div className="listen">
                            <img className="listenMicro" src="mic2.png" />
                            <button onClick={hideMic}>X</button>
                        </div>
                    )}

                    <div id="onTheTractor">
                        {onboard
                            .filter((animal) => {
                                return animal.level <= level;
                            })
                            .map((animal) => (
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
                                <div className="dropdown-content">
                                    <button onClick={() => setLevel(0)}>
                                        Easy
                                    </button>
                                    <button onClick={() => setLevel(1)}>
                                        Normal
                                    </button>
                                    <button onClick={() => setLevel(2)}>
                                        Hard
                                    </button>
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
                                    Hey bud, help me call all the animals home!
                                    <br></br> They only understand German, and I
                                    don`t speak German. <br></br>If you name the
                                    animal correctly, it will jump into the
                                    tractor by itself.
                                    <img
                                        className="farmerSmall"
                                        src="farmer.png"
                                    />
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
                        {error && (
                            <div>
                                <img className="yesNo" src="no_icon.png" />
                                <h1>Try again!</h1>
                            </div>
                        )}
                    </div>
                    <h5>Call all the animals in German</h5>
                </div>
                <div id="animals">
                    <div className="animalsWrapper">
                        {offboardedAnimals
                            .filter((animal) => {
                                return animal.level <= level;
                            })
                            .map((animal) => (
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
        </>
    );
}
