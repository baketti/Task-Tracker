import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./customer.selectors";
import { CustomerState } from "./customer.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./customer.sagas";
import { ObjectIdFe } from "@/models/common/JsUtility";

const initialState: CustomerState = {
  list: [],
  editCustomerId: null,
};

export const customerStore = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setEditCustomerId: (state, action: PayloadAction<ObjectIdFe>) => {
      state.editCustomerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(extraActions.getCustomers.success, (state, action) => {
      state.list = action.payload.data.customers;
    });
    builder.addCase(extraActions.postCustomers.success, (state, action) => {
      state.list = [...(state.list || []), action.payload.data.customer];
    });
    builder.addCase(
      extraActions.patchCustomersByCustomerId.success,
      (state, action) => {
        state.list = (state.list ?? []).map((customer) =>
          customer._id === action.payload.data.customer._id
            ? action.payload.data.customer
            : customer,
        );
      },
    );
    builder.addCase(
      extraActions.deleteCustomersByCustomerId.success,
      (state, action) => {
        state.list = (state.list ?? []).filter(
          (customer) =>
            customer._id !== action.payload.prepareParams.customerId,
        );
      },
    );
  },
});

export { selectors, sagas };
