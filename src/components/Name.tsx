import Alert from "./Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Name.css";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import walkanimation from "../assets/walkanimation.json";
import { useRef } from "react";
import axios from "axios";

interface Props {
  onValueChange: (newName: string) => void;
}

function Name({ onValueChange }: Props) {

 const checkCredentials = async (
   name: string,
   password: string
 ): Promise<boolean> => {
   let pass = false;
   try {
     const response = await axios.post<{ message: string }>(
       "/check-credentials",
       { name, password }
     );

     if (response.status === 200) {
       console.log(response.data.message); // "Pass" message
       pass = true; // Set pass to true if credentials are correct
     }
   } catch (error) {
     if (axios.isAxiosError(error) && error.response?.status === 401) {
       const message = (error.response.data as { message: string }).message;
       console.log(message); // "Fail" message
     } else {
       console.error("There was an error!", error); // Handle other possible errors
     }
   }

   return pass; // Return the pass value after the async operation
 };

  const walkRef = useRef<LottieRefCurrentProps>(null);
  const [alertVisible, setAlertVisibility] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userName = (document.getElementById("name") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    const isPass = await checkCredentials(userName, password); // Wait for checkCredentials to complete

    if (isPass) {
      onValueChange(userName);
      navigate("/tracker/");
    } else {
      setAlertVisibility(true); // Show alert if credentials are incorrect
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
