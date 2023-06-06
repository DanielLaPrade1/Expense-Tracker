import "./ResultGrid.css";
import React from "react";

const ResultGrid = () => {
  return (
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
          <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultGrid;
