import React, { useEffect } from "react";
import "./Verify.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Paymentverify } from "../../api_function";
const Verify = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const navigate = useNavigate();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const res = await Paymentverify(success, orderId);
      if (res.data.status === 200) {
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <>
      <div className="verify">
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Verify;
