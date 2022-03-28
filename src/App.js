import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import Home from "./pages/Home";
import { ConnectPage } from "./pages/ConnectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path={"connect"} element={<ConnectPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
