import Alert from "./Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onValueChange: (newName: string) => void;
}

function Name({ onValueChange }: Props) {
  const validNames = new Map([
    ["sharon", "1"],
    ["nicholas", "2"],
    ["joe", "3"],
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
      navigate("/tracker/");    } else {
      setAlertVisibility(true);
    }
  };

  return (
    <>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>Invalid Login</Alert>
      )}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" id="name"></input>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="password"></input>
      </div>
      <div></div>
      <button
        type="button"
        className="btn btn-primary"
        id="login"
        onClick={handleSubmit}
      >
        Log In
      </button>
    </>
  );
}

export default Name;
