import { useState } from "react";
import "./App.css";
import "./index.css";

import React from "react";
import PaymentForm from "./components/PaymentForm";
import ResultGrid from "./components/ResultGrid";

const App = () => {
  return (
    <div>
      <PaymentForm></PaymentForm>
      <ResultGrid />
    </div>
  );
};

export default App;
