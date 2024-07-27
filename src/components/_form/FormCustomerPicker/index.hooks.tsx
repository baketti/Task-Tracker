import { useSelector } from "react-redux";
import { selectors } from "@/spas/app/redux-store";
import { useMemo } from "react";
import { CustomerFe } from "@/models/client/CustomerFe";

export const useFormCustomerPicker = () => {
  const customers = useSelector(selectors.getCustomersList);
  const customerOptions = useMemo(
    () =>
      customers.map((customer) => ({
        id: customer._id,
        value: customer.name,
      })),
    [customers],
  );

  return { customerOptions };
};
