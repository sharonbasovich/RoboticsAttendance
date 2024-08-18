import { useState, useEffect } from "react";
import Button from "./Button";
import Alert from "./Alert";

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
      <h1>You are logged in as: {nameLogged}</h1>
      <Button color="success" onClick={handleCheckIn}>
        Clock In
      </Button>
      {inVisibility && (
        <Alert onClose={() => setInVisibility(false)}>
          You are clocked in!
        </Alert>
      )}
      <Button color="danger" onClick={handleCheckOut}>
        Clock Out
      </Button>
      {outVisibility && (
        <Alert onClose={() => setOutVisibility(false)}>
          You are clocked out after {hours} hours!
        </Alert>
      )}
    </>
  );
}

export default Tracker;
