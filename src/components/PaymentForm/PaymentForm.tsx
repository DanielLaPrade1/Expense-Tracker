import React from "react";
import "./PaymentForm.css";
import { FaQuestionCircle } from "react-icons/fa";

const PaymentForm = () => {
  return (
    <form className="container-pf">
      <div className="mb-3">
        <label className="form-label input-label">Date</label>
        <input
          type="date"
          className="form-control input"
          id="date"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label className="form-label input-label">Amount</label>
        <input type="number" className="form-control input" id="amount" />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input checkbox" id="gas" />
        <label className="form-check-label checkbox-label" htmlFor="gas">
          <FaQuestionCircle size={20} color="#fc7" />
          &nbsp; Gas Deducted from total
        </label>
      </div>
      <button type="submit" className="btn-custom">
        Add
      </button>
    </form>
  );
};

export default PaymentForm;
