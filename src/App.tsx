import Name from "./components/Name";
function App() {
  let names = ["sharon", "nicholas", "anton"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <Name />
    </div>
  );
}

export default App;
