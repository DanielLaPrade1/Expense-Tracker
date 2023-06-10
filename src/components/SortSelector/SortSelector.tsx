import { FieldValues } from "react-hook-form";
import "./SortSelector.css";
import React, { useState } from "react";

interface Props {
  onSelectChange: (e: FieldValues) => void;
}

const SortSelector = ({ onSelectChange }: Props) => {
  return (
    <div className="select-box">
      <select
        className="form-select bg-light"
        aria-label="Default select example"
        onChange={onSelectChange}
      >
        <option value="Dh2l">Date (highest to lowest)</option>
        <option value="Dl2h">Date (lowest to highest)</option>
        <option value="Ah2l">Amount (highest to lowest)</option>
        <option value="Al2h">Amount (lowest to highest)</option>
      </select>
    </div>
  );
};

export default SortSelector;
