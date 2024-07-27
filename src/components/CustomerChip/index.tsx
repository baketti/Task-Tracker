import React, { memo } from "react";
import { useCustomerChip } from "./index.hooks";
import { Avatar, Chip } from "@mui/material";
import { CustomerFe } from "@/models/client/CustomerFe";

type CustomerChipProps = {
  customer: CustomerFe;
};

export const CustomerChip = memo(({ customer }: CustomerChipProps) => {
  const {} = useCustomerChip();

  return (
    <Chip
      label={customer.name}
      avatar={<Avatar alt={customer.name} src={customer.logoUrl} />}
    />
  );
});
CustomerChip.displayName = "CustomerChip";
