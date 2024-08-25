import { ReactNode } from "react";
import "./Alert.css";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

function Alert({ children, onClose }: Props) {
  return (
    <>
      <div className="alert alert-danger alert-dismissible custom-alert-danger">
        {children}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </>
  );
}

export default Alert;
