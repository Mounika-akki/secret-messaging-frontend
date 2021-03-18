import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./NewMessage.css";

const NewMessage = () => {
  const history = useHistory();
  const [randomString, setRandomString] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [targetMail, setTargetMail] = useState("");
  const [rootUrl, setRootUrl] = useState("");
  const [buttonHidden, setButtonHidden] = useState(true);

  useEffect(() => {
    setRandomString(Math.random().toString(36).substring(5).toUpperCase());
    setRootUrl(`${window.location.href}message/`);
    console.log(window.location.href);
  }, []);

  useEffect(() => {
    if (
      randomString.length > 0 &&
      password.length > 4 &&
      message.length > 0 &&
      targetMail.length > 0 &&
      rootUrl.length > 0
    ) {
      setButtonHidden(false);
    } else {
      setButtonHidden(true);
    }
  }, [randomString, password, message, targetMail, rootUrl]);

  const handleMessageSubmit = () => {
    fetch("http://localhost:5000/create-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        randomKey: randomString,
        password: password,
        message: message,
        targetMail: targetMail,
        targetURL: rootUrl,
      }),
    })
      .then((res) => res.json())
      .then((res) => history.go(0))
      .catch((err) => console.log(err));
  };

  return (
    <div className="new-message-screen">
      <form className="new-message-screen-form">
        <h3 className="new-message-screen-title">SECRET MESSAGING APP</h3>

        <div className="form-group">
          <label htmlFor="target" className="input-group">
            To :
          </label>
          <input
            type="text"
            id="target"
            className="input-group"
            value={targetMail}
            onChange={(e) => setTargetMail(e.target.value)}
            placeholder="xyz123@email.com"
            required
          />
        </div>
        <div className="halfDiv ">
          <div className="form-group pr-3">
            <label className="input-group" htmlFor="rs">
              Secret key :
            </label>
            <input
              className=" input-group"
              type="text"
              id="rs"
              value={randomString}
              placeholder="Secret key"
              onChange={(e) => setRandomString(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="input-group" htmlFor="password">
              Password :
            </label>
            <input
              className=" input-group"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password must be atleast 6 characters long"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="input-group" htmlFor="message">
            Message :
          </label>
          <textarea
            className=" input-group"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter the secret message here..."
            rows="8"
            required
          />
        </div>

        <button
          type="button"
          disabled={buttonHidden}
          className="btn btn-primary"
          onClick={handleMessageSubmit}
        >
          Send
        </button>
      </form>
      <div className="new-message-screen-delete p-2">
        <span className="new-message-screen-subtext">
          Want to delete a message? &nbsp;
          <a
            className="delete-link"
            onClick={() => {
              history.push("/delete");
            }}
          >
            Click here
          </a>
        </span>
      </div>
    </div>
  );
};

export default NewMessage;
