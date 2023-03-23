import React from "react";

import { Radio } from "antd";

import { usePincodeCheck } from "../../hooks";
import { useSummaryContext } from "../../store/SummaryProvider";
import { isEmpty } from "lodash";

const PaymentCard = () => {
  const { address, paymentType, setPaymentType } = useSummaryContext();
  const [pincodeData, loading] = usePincodeCheck(address?.pincode);

  const onPaymentChange = (e) => {
    setPaymentType(e.target.value);
  };

  if (loading || isEmpty(pincodeData)) return null;

  return (
    <div className='my-4'>
      <h3 className='text-base font-semibold my-2'>Choose Payment Option</h3>
      <Radio.Group
        className='flex flex-col'
        onChange={onPaymentChange}
        value={paymentType}
      >
        <div
          className='border shadow-sm p-4 rounded-lg my-2'
          onClick={() => setPaymentType("cod")}
        >
          <Radio value='cod' disabled={!pincodeData[0]["cod"]}>
            <p>Cash on Delivery</p>
          </Radio>
        </div>
        <div
          className='border shadow-sm p-4 rounded-lg my-2'
          onClick={() => setPaymentType("prepaid")}
        >
          <Radio value='prepaid'>
            <p>Pay Online</p>
            <p className='text-xs text-gray-400'>
              Credit/Debit Card, UPI, Netbanking
            </p>
          </Radio>
        </div>
      </Radio.Group>
    </div>
  );
};

export default PaymentCard;
