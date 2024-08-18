import Name from "./components/Name";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tracker from "./components/Tracker";
import { useState } from "react";

function App() {
  const [name, setName] = useState<string>("");

  const updateName = (newName: string) => {
    setName(newName);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Name onValueChange={updateName} />} />
          <Route path="/tracker/" element={<Tracker nameLogged={name} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
