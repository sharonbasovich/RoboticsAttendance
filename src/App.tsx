import Name from "./components/Name";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Tracker from "./components/Tracker";
import "./App.css"

function App() {
  

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Name/>}/>
          <Route path="/tracker/" element={<Tracker/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
