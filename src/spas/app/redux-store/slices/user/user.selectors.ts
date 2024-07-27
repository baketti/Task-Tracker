import { RootState } from "@/spas/app/redux-store";

export const getUser = (state: RootState) => state?.user.me;
export const getIsLogged = (state: RootState) => state?.user.isLogged;
