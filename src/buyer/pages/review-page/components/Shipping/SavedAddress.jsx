import React from "react";
import { Skeleton } from "antd";

import { AddressCard } from "@buyer/components";
import { useGetUserAddress } from "../../hooks";
import { useSummaryContext } from "../../store/SummaryProvider";

const SavedAddressPage = () => {
  const { setAddress, address } = useSummaryContext();
  const [addresses, loading] = useGetUserAddress();

  if (loading)
    return (
      <>
        <Skeleton active className="mt-4 p-2" />
        <Skeleton active className="mt-4 p-2" />
      </>
    );
  
  if (!addresses?.length) return <div className="text-center my-20">No address found</div>;

  return (
    <div className="w-full">
      {addresses.map((item) => {
        return (
          <AddressCard
            key={item.id}
            address={item}
            active={item.id === address?.id}
            onClick={setAddress}
          />
        );
      })}
    </div>
  );
};

export default SavedAddressPage;
