import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./index.css";
import MrKrabsImage from "../images/MrKrabs.ico";
import PaymentTrackerBackground from "../images/PaymentTrackerBackground.ico";

import PaymentForm from "./components/PaymentForm";
import ResultGrid from "./components/ResultGrid";
import { FieldValues } from "react-hook-form";
import SortSelector from "./components/SortSelector";
import ErrorMessage from "./components/ErrorMessage";

//Different sorts for the ResultGrid
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
  //Load form data, total and sort selection from local storage
  const [formData, setFormData] = useState<FieldValues[]>(() => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [amountTotal, setAmountTotal] = useState(() => {
    const storedTotal = localStorage.getItem("amountTotal");
    return storedTotal ? parseFloat(storedTotal) : 0;
  });
  const [selectedOption, setSelectedOption] = useState(() => {
    const storedOption = localStorage.getItem("selectedOption");
    return storedOption || "";
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
      const newFormData = sortTable([...formData, data], selectedOption);
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
  const handleSelectChange = (e: FieldValues) => {
    const selected = e.target.value;
    setSelectedOption(selected);
    localStorage.setItem("selectedOption", selected);
  };

  useEffect(() => {
    const sortedData = sortTable(formData, selectedOption);
    setFormData(sortedData);
  }, [selectedOption]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        backgroundImage: `url(${PaymentTrackerBackground})`,
        backgroundSize: "cover-y",
        backgroundRepeat: "repeat",
        minHeight: "100%",
        minWidth: "100%",
        padding: "20px",
      }}
    >
      <div className="components">
        <img className="side-image" src={MrKrabsImage} />
        <PaymentForm onSubmit={handleFormSubmit}></PaymentForm>

        {!amountError && dateError && (
          <ErrorMessage message="Please enter a Date." />
        )}
        {amountError && !dateError && (
          <ErrorMessage message="Please enter an Amount." />
        )}
        {amountError && dateError && (
          <ErrorMessage message="Please enter a Date and Amount." />
        )}

        <SortSelector
          onSelectChange={handleSelectChange}
          selectedOption={selectedOption}
        />

        <div className="container-rg">
          <table className="table table-hover table-light">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">$Amount</th>
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

        <div className="total-container">
          <p className="total-label">Total: </p>
          <p className="total-display">${amountTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
