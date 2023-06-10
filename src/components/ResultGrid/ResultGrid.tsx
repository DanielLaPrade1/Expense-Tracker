import "./ResultGrid.css";
import React, { useState } from "react";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";

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

  //Update row state on click
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
      <td>
        {gas ? (
          <BiCheckCircle color="green" size={25} />
        ) : (
          <BiXCircle color="red" size={25} />
        )}
      </td>
      {showAdditionalColumn && (
        <button className="button" onClick={onDelete}>
          Delete
        </button>
      )}
    </tr>
  );
};

export default ResultGrid;
