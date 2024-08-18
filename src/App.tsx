import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import InputBox from "./components/InputBox"
import Button from "./components/Button"
import Alert from "./components/Alert"
import './App.css'

function App() {
  const [visibility, setVisibility] = useState(false);
  let name = "Placeholder";
  
  return (
    <>
      <h1>You are logged in as: {name}</h1>
      <Button color="success" onClick={() => setVisibility(true)}>Clock In</Button>
      {visibility && <Alert>You are clocked in!</Alert>}
      <InputBox inputField="Password:" />
      <Button color="danger">Clock Out</Button>
    </>
  )
}

export default App
