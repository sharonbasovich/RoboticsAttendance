function Name() {
  const validNames = new Map([
    ["sharon", "1"],
    ["nicholas", "2"],
    ["joe", "3"],
  ]);

  const handleSubmit = () => {
    const userName = (document.getElementById("name") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    if (validNames.get(userName) === password) {
      console.log("valid");
    } else {
      console.log("invalid");
    }
  };
  return (
    <>
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
      <button
        type="submit"
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
