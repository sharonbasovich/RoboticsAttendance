
interface props {
  inputField: string;
}


const InputBox = ({inputField}: props) => {
  return (
    <div>
        <p>{inputField}</p>
        <input type="text" />
    </div>
  )
}

export default InputBox