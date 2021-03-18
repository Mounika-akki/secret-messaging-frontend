import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ShowMessage.css";

const ShowMessage = () => {
  const history = useHistory();

  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    setId(url.searchParams.get("rs"));
  }, []);
  // https://secret-messaging-app.herokuapp.com/
  useEffect(() => {
    if (id?.length > 0) {
      fetch(`https://secret-messaging-app.herokuapp.com/message-by-id/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setMessage(res.result[0]?.message);
          setPageLoaded(true);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      {pageLoaded ? (
        <div className="message-screen">
          <form className="message-screen-form">
            <h3 className="message-screen-title">SECRET MESSAGING APP</h3>

            <button
              className="float-right home"
              onClick={() => {
                history.push("/");
              }}
            >
              <i class="fa fa-fw fa-home"></i>Home
            </button>

            <div className="mt-3">
              <div className="border rounded text-center p-4 m-4">
                {message ? (
                  <div>
                    <div className="text-center px-5 mx-5 mt-3">
                      <p>
                        ***This is a secret message for you from your unknown
                        friend!!!**
                      </p>
                    </div>
                    <p>{message}</p>
                  </div>
                ) : (
                  <p>Oops !! This message has been deleted by the creator</p>
                )}
              </div>
            </div>
            <div className="text-center">
              <span className="new-message-screen-subtext">
                Want to send a secret message to your friend ? &nbsp;
                <a
                  className="home-link"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Click here
                </a>
              </span>
            </div>
          </form>
        </div>
      ) : (
        <div className="loading">
          <div className="container text">Loading....</div>
        </div>
      )}
    </>
  );
};

export default ShowMessage;
