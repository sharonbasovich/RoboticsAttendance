interface props {
  children: string;
  className: string;
  onClick?: () => void;
}

const Button = ({ children, className, onClick }: props) => {
  return (
    <div>
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
