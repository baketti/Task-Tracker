import { RootState } from "@/spas/app/redux-store";

export const getIsDialogOpen = (state: RootState) => state?.ui?.isDialogOpen;
