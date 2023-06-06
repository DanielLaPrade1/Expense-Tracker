import "./ResultGrid.css";
import React from "react";

interface Props {
  date: string;
  amount: string;
  gas: boolean;
}

const ResultGrid = ({ date, amount, gas }: Props) => {
  return (
    <tr>
      <td scope="row">{date}</td>
      <td>${parseFloat(amount).toFixed(2)}</td>
      <td>{gas ? "Deducted" : "Not deducted"}</td>
    </tr>
  );
};

export default ResultGrid;
