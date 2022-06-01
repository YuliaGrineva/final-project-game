import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function Victory() {
   
    useEffect(() => {
        const cucaracha = document.getElementById("music");
        cucaracha.play();
    }, []);

    function pauseAudio() {
        const cucaracha = document.getElementById("music");
        cucaracha.pause();
    }

    function playAudio() {
        const cucaracha = document.getElementById("music");
        cucaracha.play();
    }

    return (
        <div className="winPage">
            <audio
                src="cucaracha.mp3"
                preload="auto"
                id="music"
                type="audio/mp3"
            ></audio>

            <div className="buttons2">
                <Link to="/game1">
                    <img className="popupButton" id="go" src="go.png" />
                </Link>

                <Link to="/">
                    <img className="popupButton" src="home.png" />
                </Link>
            </div>
            <div className="sound">
                <img
                    onClick={pauseAudio}
                    className="noSound"
                    src="noSound.png"
                />
                <img onClick={playAudio} className="noSound" src="sound.png" />
            </div>
            <div className="konfeti">
                <img className="konfetiItem" src="konfeti.png" />
                <img className="konfetiItem" src="konfeti.png" />
            </div>
            <div className="dance">
                <img className="dancingAnimals2" src="sharf.png" />
                <img className="dancingAnimals" src="svin.png" />
                <img className="dancingAnimals2" src="ziege3.png" />
                <img className="dancingAnimals" src="hahn.png" />
                <img className="dancingAnimals2" src="kue.png" />
                <img className="dancingAnimals" src="cat.png" />
                <img className="dancingAnimals2" src="baer.png" />
                <img className="dancingAnimals" src="dog.png" />
                <img className="dancingAnimals2" src="pig.png" />
                <img className="dancingAnimals" src="mause.png" />
            </div>
            <img className="farmer" src="farmer.png" />
        </div>
    );
}
