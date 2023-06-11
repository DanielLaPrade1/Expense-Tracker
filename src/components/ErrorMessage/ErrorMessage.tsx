import React, { useEffect, useState } from "react";
import "./ErrorMessage.css";
import { BiError } from "react-icons/bi";

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    setErrorVisible(true);
  }, []);

  return (
    <div className={`error ${errorVisible ? "fade-in" : ""}`}>
      <BiError color="red" size={30} /> {message}
    </div>
  );
};

export default ErrorMessage;
