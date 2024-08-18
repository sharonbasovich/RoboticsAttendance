import { useState, useEffect } from "react";
import Button from "./Button";
import Alert from "./Alert";
import axios, { AxiosResponse, AxiosError } from "axios";
import "./Tracker.css";

interface Props {
  nameLogged: string;
}

function Tracker({ nameLogged }: Props) {
  const [inVisibility, setInVisibility] = useState(false);
  const [outVisibility, setOutVisibility] = useState(false);
  const [hours, setHours] = useState(-1);
  const [timeIn, setTimeIn] = useState(-1);

  const addRowToCsv = (name: string, hours: string) => {
    axios
      .post<{ message: string }>("/add-row", { name, hours })
      .then((response: AxiosResponse<{ message: string }>) => {
        console.log(response.data.message);
      })
      .catch((error: AxiosError) => {
        console.error("There was an error!", error);
      });
  };

  const handleCheckIn = () => {
    setInVisibility(true);
    setTimeIn(new Date().getTime());
  };

  const handleCheckOut = () => {
    setOutVisibility(true);
    let timeOut = new Date().getTime();
    setHours(Math.round((timeOut - timeIn) / 36000) / 100);
  };

  useEffect(() => {
    if (hours > -1) {
      addRowToCsv(nameLogged, hours.toString());
    }
  }, [hours]);

  return (
    <>
      <div className="container">
        <h1 className="header-style">
          Login Successful! Welcome: {nameLogged}
        </h1>
      </div>
      <div className="container">
        <Button onClick={handleCheckIn} className="clock-in">
          Clock In
        </Button>
      </div>

      {inVisibility && (
        <Alert onClose={() => setInVisibility(false)}>
          You are clocked in!
        </Alert>
      )}
      <div className="container">
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
