import Name from "./components/Name";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Tracker from "./components/Tracker";

function App() {
  

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Name/>}/>
          <Route path="/tracker/" element={<Tracker/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
