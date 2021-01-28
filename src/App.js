import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useEffect } from "react";


import Header from "./Header";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Unknown from "./Unknown";
import View from "./View";
import Profile from "./Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path={["/", "/students"]}>
            <View />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="*">
            <Unknown />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
