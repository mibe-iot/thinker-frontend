import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Main} from "./pages/Main";
import Home from "./pages/Home";
import Devices from "./pages/Devices";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"devices"} element={<Devices/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
