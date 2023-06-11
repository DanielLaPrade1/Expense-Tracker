import "./PaymentForm.css";
import { FaQuestionCircle } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";

interface Props {
  onSubmit: (data: FieldValues) => void;
}

const PaymentForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="container-pf" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label input-label">Date</label>
        <input
          {...register("date")}
          id="date"
          type="date"
          className="form-control bg-light input"
        />
      </div>
      <div className="mb-3">
        <label className="form-label input-label">Amount</label>
        <input
          {...register("amount")}
          id="amount"
          type="number"
          step="any"
          className="form-control bg-light input"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          {...register("gas")}
          id="gas"
          type="checkbox"
          className="form-check-input checkbox"
        />
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
