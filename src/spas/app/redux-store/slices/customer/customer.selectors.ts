import { RootState } from "@/spas/app/redux-store";
import { createSelector } from "@reduxjs/toolkit";
import { CustomerFe } from "@/models/client/CustomerFe";

export const getCustomersList = createSelector(
  (state: RootState) => state?.customer?.list,
  (customers) => customers.map((customer) => new CustomerFe(customer)),
);
export const getEditCustomerId = (state: RootState) =>
  state.customer.editCustomerId;
