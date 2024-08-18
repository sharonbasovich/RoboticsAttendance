interface props {
  children: string;
  color: string;
  onClick?: () => void;
}

const Button = ({ children, color, onClick }: props) => {
  return (
    <div>
      <button type="button" className={"btn btn-" + color} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
