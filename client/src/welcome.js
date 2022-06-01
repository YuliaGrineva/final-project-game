import { Link } from "react-router-dom";
export default function Welcome() {
    return (
        <header className="App-header">
            <img className="wolk" src="wolk.png" />
            <img className="wolk2" src="wolk.png" />
            <img src="kue.png" className="logo" alt="logo" />
            <div className="hi">
                <p>Hi, Buddy!</p>
                <p>Möchtest du spielen?</p>
                <Link to="/game1">
                    <img className="ja" src="go.png" />
                </Link>
            </div>
            <div className="welcomeAnimals">
                <img className="sharf" src="sharf.png" />
                <img className="baer" src="baer.png" />
                <img className="svin" src="svin.png" />
                <img className="ziege" src="ziege.png" />
                <img className="mause" src="mause.png" />
                <img className="grass" src="grass.png" />
            </div>
        </header>
    );
}
