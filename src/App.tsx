import { useState } from "react";
import "./App.css";
import "./index.css";

import React from "react";
import PaymentForm from "./components/PaymentForm";
import ResultGrid from "./components/ResultGrid";
import { FieldValues } from "react-hook-form";

const App = () => {
  const [formData, setFormData] = useState<FieldValues[]>([]);

  const handleFormSubmit = (data: FieldValues) => {
    setFormData([...formData, data]);
  };

  return (
    <div>
      <PaymentForm onSubmit={handleFormSubmit}></PaymentForm>
      <div className="container-rg">
        <table className="table table-bordered">
          <thead>
            <tr className="row-outline">
              <th scope="col">Date</th>
              <th scope="col">$ Amount</th>
              <th scope="col">Gas?</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((oneFormData, index) => (
              <ResultGrid
                key={index}
                date={oneFormData.date}
                amount={oneFormData.amount}
                gas={oneFormData.gas}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
