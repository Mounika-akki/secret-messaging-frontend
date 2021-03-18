import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./DeleteMessage.css";
const DeleteMessage = () => {
  const history = useHistory();

  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (secretKey.length > 0 && password.length > 0) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [secretKey, password]);

  const handleDeleteMessage = () => {
    fetch("https://secret-messaging-app.herokuapp.com/delete-message", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretKey: secretKey,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setResponse(res.message);
        setBtnDisable(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="message-screen">
      <form className="message-screen-form">
        <h3 className="message-screen-title">SECRET MESSAGING APP</h3>

        <button
          className="float-right home"
          onClick={() => {
            history.push("/");
          }}
        >
          <i className="fa fa-fw fa-home"></i>Home
        </button>

        <div className="form-group">
          <label htmlFor="key">Secret Key : </label>
          <input
            type="text"
            className="input-group"
            id="key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pwd">Password : </label>
          <input
            type="password"
            className="input-group"
            id="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {response.length > 0 && (
          <h5 className="mt-2 mb-4">Message : {response}</h5>
        )}
        <button
          className="btn btn-danger delete-btn"
          disabled={btnDisable}
          onClick={handleDeleteMessage}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteMessage;
