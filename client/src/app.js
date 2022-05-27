import { BrowserRouter, Route } from "react-router-dom";
import Game1 from "./game1";
import Welcome from "./welcome";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/">
                    <Welcome />
                </Route>
                <Route exact path="/game1">
                    <Game1 />
                </Route>
            </BrowserRouter>
        </div>
    );
}
