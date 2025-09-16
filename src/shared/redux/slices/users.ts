import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User, UsersState } from "@/shared/types/redux";

const defaultState: UsersState = {
  currentUser: null,
  list: [
    {
      _id: "67add97867edf98b75d8f8b5",
      firstName: "usama",
      lastName: "efldk",
      email: "adqmin@dedsolint.com",
      isVerified: false,
      organizationId: "67add97967edf98b75d8f8b9",
    },
    {
      _id: "67adc93467edf98b75d8f87a",
      firstName: "usama",
      lastName: "efldcv lkmv",
      email: "adamin@desolint.com",
      isVerified: false,
      organizationId: "67adc93567edf98b75d8f87e",
    },
    {
      _id: "67adc8e867edf98b75d8f872",
      firstName: "usama",
      lastName: "jehvcknl ",
      email: "admzin@desolint.com",
      isVerified: false,
      organizationId: "67adc8e867edf98b75d8f876",
    },
    {
      _id: "67ab43fb67edf98b75d8f6e9",
      firstName: "usama",
      lastName: "gill",
      email: "axdmin@desolint.com",
      isVerified: false,
      organizationId: "67ab43fb67edf98b75d8f6ed",
    },
    {
      _id: "67aafe0e76561343d28f217d",
      firstName: "efld,.v c",
      lastName: "jehvcknl ",
      email: "adddddmin@desdddolint.com",
      isVerified: false,
      organizationId: "67aafe0f76561343d28f2181",
    },
    {
      _id: "67aafdc576561343d28f2170",
      firstName: "efld,.v c",
      lastName: "efldk",
      email: "addmin@dedsolint.com",
      isVerified: false,
      organizationId: "67aafdc676561343d28f2174",
    },
    {
      _id: "67aafd5476561343d28f2167",
      firstName: "efld,.v c",
      lastName: "axcvxcxcxccxcxcxcxcxcxcxcxccxxcx",
      email: "admzxzxzxzxzxzxzin@desolint.com",
      isVerified: false,
      organizationId: "67aafd5576561343d28f216b",
    },
    {
      _id: "67a5fad376561343d28f2159",
      firstName: "efld,.v c",
      lastName: "efldcv lkmv",
      email: "admin@dedsklemfdvcolint.com",
      isVerified: false,
      organizationId: "67a5fad476561343d28f215d",
    },
    {
      _id: "67a5f62b76561343d28f214c",
      firstName: "efld,.v c",
      lastName: "efldk",
      email: "admin@desdddolint.com",
      isVerified: false,
      organizationId: "67a5f62b76561343d28f2150",
    },
    {
      _id: "67a5f5e276561343d28f2144",
      firstName: "efld,.v c",
      lastName: "efldk",
      email: "admin@dedcsolint.com",
      isVerified: false,
      organizationId: "67a5f5e376561343d28f2148",
    },
    {
      _id: "67a49d5d76561343d28f212b",
      firstName: "efld,.v c",
      lastName: "jehvcknl ",
      email: "admin@dedsolint.com",
      isVerified: true,
      organizationId: "67a49d5d76561343d28f212f",
    },
    {
      _id: "675bd2931627c76f3563a484",
      firstName: "Awais",
      lastName: "Tahir",
      email: "awais.tahir@desolint.com",
      isVerified: true,
      organizationId: "675bd2941627c76f3563a488",
    },
    {
      _id: "675a8048e819352eb129e61a",
      firstName: "Testing",
      lastName: "User",
      email: "hamza.siddique@desolint.com",
      isVerified: true,
      organizationId: "675a8048e819352eb129e61e",
    },
    {
      _id: "6731ccb1181b9cf1a5f00689",
      firstName: "Hamza",
      lastName: "Siddique",
      email: "admin@desolint.com",
      isVerified: true,
      organizationId: "6731ccb2181b9cf1a5f0068d",
    },
  ],
};

const slice = createSlice({
  name: "users",
  initialState: defaultState,
  reducers: {
    resetUserState: () => defaultState,
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
  },
});

export default slice.reducer;

export const actions = slice.actions;

export const getCurrentUser = (state: { users: UsersState }) =>
  state.users.currentUser;

export const getUsersList = (state: { users: UsersState }) => state.users.list;
