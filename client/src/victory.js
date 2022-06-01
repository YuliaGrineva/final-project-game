import { Link } from "react-router-dom";
export default function Victory() {
    return (
        <>
            <img className="victory" src="farmer.gif" />
            <p>Play again?</p>
            <Link to="/game1">
                <img className="ja" src="go.png" />
            </Link>
            <p>Home?</p>
            <Link to="/">
                <img className="ja" src="go.png" />
            </Link>
        </>
    );
}
