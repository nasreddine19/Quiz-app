import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Questions from "./pages/Questions";
import QuestionCategory from "./pages/QuestionCategory";
import Footer from "./components/Footer";
export default function App() {
  return ( 
      <>
      <Router>
        <Routes>
          <Route path="/" element={<QuestionCategory />}></Route>
          <Route path="/question/:category/:difficultly/:questionNum" element={<Questions/>}></Route>
        </Routes>
      </Router>
      <Footer />
      </>
     
    
  );
}
