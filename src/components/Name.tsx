import Alert from "./Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Name.css";

interface Props {
  onValueChange: (newName: string) => void;
}

function Name({ onValueChange }: Props) {
  const validNames = new Map([
    ["Sharon", "1"],
    ["Nicholas", "2"],
    ["Joe", "3"],
  ]);

  const [alertVisible, setAlertVisibility] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const userName = (document.getElementById("name") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    if (validNames.get(userName) === password) {
      onValueChange(userName);
      navigate("/tracker/");
    } else {
      setAlertVisibility(true);
    }
  };

  return (
    <>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>Invalid Login</Alert>
      )}
      <div className="container-2">
        <img
          src="src\assets\St.theresa_logo.png"
          alt="Image of School Logo"
          className="img-school"
        />
      </div>
      <div className="container">
        <h1 className="header-format">Robotics Attendance</h1>
        <img
          src="src\assets\vex_robot_by_jumbienutes_dffslku-pre.jpg"
          alt="Image of a Robot."
          className="img-style"
        />
      </div>
      <div className="container">
        <label htmlFor="name" className="custom-format">
          Name
        </label>
        <input type="text" className="input-style" id="name"></input>
      </div>
      <div className="container">
        <label htmlFor="password" className="custom-format">
          Password
        </label>
        <input type="password" className="input-style" id="password"></input>
      </div>
      <div className="container">
        <button
          type="button"
          className="btn-style"
          id="login"
          onClick={handleSubmit}
        >
          Log In
        </button>
      </div>
    </>
  );
}

export default Name;
