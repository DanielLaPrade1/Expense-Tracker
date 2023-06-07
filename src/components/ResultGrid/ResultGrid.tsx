import "./ResultGrid.css";
import React, { useState } from "react";

interface Props {
  date: string;
  amount: string;
  gas: boolean;
  onDelete: () => void;
}

const ResultGrid = ({ date, amount, gas, onDelete }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showAdditionalColumn, setShowAdditionalColumn] = useState(false);

  const handleClick = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
    showAdditionalColumn
      ? setShowAdditionalColumn(false)
      : setShowAdditionalColumn(true);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <tr onClick={handleClick}>
      <td scope="row">{date}</td>
      <td>${parseFloat(amount).toFixed(2)}</td>
      <td>{gas ? "Deducted" : "Not deducted"}</td>
      {showAdditionalColumn && (
        <div className={showAdditionalColumn ? "max-width-column" : ""}>
          <button className="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </tr>
  );
};

export default ResultGrid;
