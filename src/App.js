import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Quiz from "./Page/Quiz";
// import "./styles.css";
import React, { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const changeName = (event) => {
    setName(event.target.value)
  }
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home changeName={changeName} name={name} />} />
        <Route path="/quiz" element={<Quiz name={name} />} />
      </Routes>
    </Router>
  );
}

export default App;
