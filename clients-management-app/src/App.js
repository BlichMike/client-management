import React from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import Header from "./common/header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./common/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
