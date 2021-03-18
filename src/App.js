import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewMessage from "./components/NewMessage";
// import ShowMessage from "./components/Dummy";
import DeleteMessage from "./components/DeleteMessage";
import ShowMessage from "./components/ShowMessage";
import "./App.css";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            return <NewMessage />;
          }}
        />
        <Route
          exact
          path="/delete"
          render={(props) => {
            return <DeleteMessage />;
          }}
        />
        <Route
          exact
          path="/message"
          render={(props) => {
            return <ShowMessage />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
