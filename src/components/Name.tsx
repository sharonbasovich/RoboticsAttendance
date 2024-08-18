import Alert from "./Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Name.css";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import walkanimation from "../assets/walkanimation.json";
import { useRef } from "react";

interface Props {
  onValueChange: (newName: string) => void;
}

function Name({ onValueChange }: Props) {
  const validNames = new Map([
    ["Sharon", "1"],
    ["Nicholas", "2"],
    ["Joe", "3"],
  ]);

  const walkRef = useRef<LottieRefCurrentProps>(null);
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
          src="src\assets\Screenshot%202024-08-18%20082306.png"
          alt="Image of School Logo"
          className="img-school"
        />
      </div>
      <div className="container">
        <h1 className="header-format">Lions Robotics Attendance</h1>
        <div className="animation-medium">
          <Lottie lottieRef={walkRef} animationData={walkanimation} />
        </div>
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
