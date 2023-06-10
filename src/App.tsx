import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";

import PaymentForm from "./components/PaymentForm";
import ResultGrid from "./components/ResultGrid";
import { FieldValues } from "react-hook-form";
import { BiError } from "react-icons/bi";
import SortSelector from "./components/SortSelector";

const sortTable = (data: FieldValues[], option: string) => {
  if (option === "Ah2l") {
    return [...data].sort((a, b) => b.amount - a.amount);
  }
  if (option === "Al2h") {
    return [...data].sort((a, b) => a.amount - b.amount);
  }
  if (option === "Dh2l") {
    return [...data].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  if (option === "Dl2h") {
    return [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
  return data;
};

const App = () => {
  //Load form data and total from local storage
  const [formData, setFormData] = useState<FieldValues[]>(() => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [amountTotal, setAmountTotal] = useState(() => {
    const storedTotal = localStorage.getItem("amountTotal");
    return storedTotal ? parseFloat(storedTotal) : 0;
  });

  //Error handling
  const [dateError, setDateError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  //Store data in local storage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    localStorage.setItem("amountTotal", amountTotal.toString());
  }, [amountTotal]);

  //Handle input submission and update total
  const handleFormSubmit = (data: FieldValues) => {
    if (data.date != "" && data.amount != "") {
      const newFormData = [...formData, data];
      setFormData(newFormData);
      setDateError(false);
      setAmountError(false);
      setAmountTotal(amountTotal + parseFloat(data.amount));
    } else {
      data.date == "" ? setDateError(true) : setDateError(false);
      data.amount == "" ? setAmountError(true) : setAmountError(false);
    }
  };

  //Handle row deletion and update total
  const handleDelete = (index: number) => {
    const newFormData = [...formData];
    setFormData(newFormData);
    newFormData.splice(index, 1);
    setAmountTotal(amountTotal - parseFloat(formData[index].amount));
  };

  //Sort items based on selected option from SortSelector
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (e: FieldValues) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const sortedData = sortTable(formData, selectedOption);
    setFormData(sortedData);
  }, [selectedOption]);

  return (
    <div>
      <PaymentForm onSubmit={handleFormSubmit}></PaymentForm>
      {!amountError && dateError && (
        <div className="error">
          <BiError color="red" size={30} />
          Please enter a Date.
        </div>
      )}
      {amountError && !dateError && (
        <div className="error">
          <BiError color="red" size={30} />
          Please enter an Amount.
        </div>
      )}
      {amountError && dateError && (
        <div className="error">
          <BiError color="red" size={30} />
          Please enter a Date and Amount.
        </div>
      )}
      <SortSelector onSelectChange={handleSelectChange} />
      <div className="container-rg">
        <table className="table table-hover table-light">
          <thead>
            <tr>
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
                onDelete={() => handleDelete(index)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p className="total-label">Total: </p>
      <p className="total-display">${amountTotal.toFixed(2)}</p>
    </div>
  );
};

export default App;
