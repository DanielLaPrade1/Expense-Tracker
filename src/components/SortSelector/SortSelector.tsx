import { FieldValues } from "react-hook-form";
import "./SortSelector.css";
import React, { useState } from "react";

interface Props {
  onSelectChange: (e: FieldValues) => void;
  selectedOption: string;
}

const SortSelector = ({ onSelectChange, selectedOption }: Props) => {
  return (
    <div className="select-box">
      <label className="form-label input-label">Sort By:</label>
      <select
        className="form-select bg-light"
        aria-label="Default select example"
        onChange={onSelectChange}
        value={selectedOption}
      >
        <option value="Dh2l">Date (most recent)</option>
        <option value="Dl2h">Date (least recent)</option>
        <option value="Ah2l">Amount (highest to lowest)</option>
        <option value="Al2h">Amount (lowest to highest)</option>
      </select>
    </div>
  );
};

export default SortSelector;
