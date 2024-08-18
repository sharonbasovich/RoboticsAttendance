import { useState, useEffect } from "react";
import Button from "./Button";
import Alert from "./Alert";
import "./Tracker.css";

interface Props {
  nameLogged: string;
}

function Tracker({ nameLogged }: Props) {
  const [inVisibility, setInVisibility] = useState(false);
  const [outVisibility, setOutVisibility] = useState(false);
  const [hours, setHours] = useState(-1);
  const [timeIn, setTimeIn] = useState(-1);
  useEffect(() => {
    console.log(hours);
  }, [hours]);

  
  const handleCheckIn = () => {
    setInVisibility(true);
    setTimeIn(new Date().getTime())
  };

  const handleCheckOut = () => {
    setOutVisibility(true);
    let timeOut = new Date().getTime();
    setHours(Math.round((timeOut - timeIn)/36000)/100);
  };

  return (
    <>
      <div className='container'>
        <h1 className='header-style'>Login Successful! Welcome: {nameLogged}</h1>
      </div>
      <div className="container">
        <Button onClick={handleCheckIn} className='clock-in'>
          Clock In
        </Button>
      </div>
     
      {inVisibility && (
        <Alert onClose={() => setInVisibility(false)}>
          You are clocked in!
        </Alert>
      )}
      <div className='container'>
        <Button onClick={handleCheckOut} className="clock-out">
          Clock Out
        </Button>
      </div>
     
      {outVisibility && (
        <Alert onClose={() => setOutVisibility(false)}>
          You are clocked out after {hours} hours!
        </Alert>
      )}
    </>
  );
}

export default Tracker;
