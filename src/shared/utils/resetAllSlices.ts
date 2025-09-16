import { socketActions } from "@/shared/redux/slices/socket";
import { actions } from "@/shared/redux/slices/users";
import { AppDispatch } from "@/shared/redux/store";

export const resetAllSlices = () => (dispatch: AppDispatch) => {
  dispatch(actions.resetUserState());
  dispatch(socketActions.resetSocketState());

  // Other slices
};
