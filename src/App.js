import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Photos from "./components/Photos";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
