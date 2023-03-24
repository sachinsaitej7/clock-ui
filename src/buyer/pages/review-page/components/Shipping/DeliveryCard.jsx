import React, { useEffect } from "react";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { useSummaryContext } from "../../store/SummaryProvider";
import { usePincodeCheck } from "../../hooks";
import { Skeleton } from "antd";

const Container = styled.div`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => props.theme.space[5]};
  border: 1px solid rgba(41, 41, 41, 0.12);
`;

const getEstimatedDate = (data) => {
  if (isEmpty(data)) return null;
  const deliveryTimeinMin = data[0]["delivery time"];

  const currentTime = moment();
  const estimatedTime = moment().add(deliveryTimeinMin, "minutes");

  // write a if conditions for delivery time
  // my deliver times are 10am to 5pm
  // if estimated time is greater than 5pm then add 1 day
  // if estimated time is less than 10am then add deliveryTimeinMin to 10am
  // else return estimatedTime

  if (currentTime.hour() >= 17) {
    return currentTime
      .add(1, "days")
      .startOf("day")
      .add(10, "hours")
      .add(deliveryTimeinMin, "minutes");
  } else if (currentTime.hour() < 10) {
    return currentTime
      .startOf("day")
      .add(10, "hours")
      .add(deliveryTimeinMin, "minutes");
  } else {
    return estimatedTime;
  }
};

const getDeliveryLabel = (address, data) => {
  if (!address || !address.pincode)
    return (
      <p className='text-gray-500 text-xs my-2'>
        will be displayed after the pincode is added
      </p>
    );

  if (isEmpty(data))
    return (
      <p className='text-red-500 text-xs my-2'>
        No delivery service available for this pincode. Please try another
        pincode
      </p>
    );

  const freeDelivery = data[0]["free delivery"];
  const deliveryCharge = data[0]["delivery charge"];

  if (freeDelivery)
    return (
      <p className='text-green-500 text-xs my-2'>
        Free Delivery on this order :)
      </p>
    );
  if (deliveryCharge)
    return <p className='my-2 text-xs'>Delivery Charge: ₹{deliveryCharge}</p>;
};

const DeliveryCard = () => {
  const { address, setAddress } = useSummaryContext();
  const [data, loading] = usePincodeCheck(address?.pincode);

  const estimatedDate = getEstimatedDate(data);

  useEffect(() => {
    if (estimatedDate) {
      setAddress((prev) => ({
        ...prev,
        deliveryDate: estimatedDate.format("YYYY-MM-DD"),
        deliveryTime: estimatedDate.format("hh:mm a"),
      }));
    }
  }, [estimatedDate?.format("YYYY-MM-DD")]);

  return (
    <>
      <h3 className='text-base font-semibold my-4'>Delivery</h3>
      <Container className='w-full'>
        {loading ? (
          <Skeleton active paragraph={{ rows: 2 }} className='my-2' />
        ) : (
          <>
            <div className='flex w-full justify-between items-center'>
              <p>
                Estimated <br />
                Delivery Time
              </p>
              <p className='font-semibold'>
                {estimatedDate
                  ? estimatedDate.format("ddd, Do MMM hh:mm a")
                  : "NA"}
              </p>
            </div>
            {getDeliveryLabel(address, data)}
          </>
        )}
      </Container>
    </>
  );
};

export default DeliveryCard;
