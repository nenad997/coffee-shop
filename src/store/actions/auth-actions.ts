import { Dispatch } from "redux";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

import { signUp, login } from "../../util/authentication/auth";
import { authSliceActions } from "../slices/auth-slice";
import { uiSliceAction } from "../slices/ui-slice";

function setExpirationTime(cb: () => void) {
  RNSecureStorage.setItem("expirationTime", "3600000", {
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
  })
    .then(res => {
      cb();
    })
    .catch(err => {
      console.log(err);
    });
}

export function signUpAction(email: string, password: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uiSliceAction.setIsLoading(true));
      const signUpData = await signUp(email, password);

      if (!signUpData) {
        throw new Error(
          "User with this email address already exists! Please pick another email address and try again later!",
        );
      }

      RNSecureStorage.setItem("authToken", signUpData.idToken, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      })
        .then(res => {
          setExpirationTime(() => {
            dispatch(authSliceActions.authenticate(signUpData.idToken));
          });
        })
        .catch(err => {
          dispatch(
            uiSliceAction.setError({
              message: "Could not save auth token, please try again later!",
            }),
          );
        });
    } catch (error: any) {
      dispatch(
        uiSliceAction.setError({
          message: error.message,
        }),
      );
    }
    dispatch(uiSliceAction.setIsLoading(false));
  };
}

export function loginAction(email: string, password: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uiSliceAction.setIsLoading(true));
      const loginData = await login(email, password);

      if (!loginData) {
        throw new Error(
          "Invalid email or password, please check your credentials and try again later!",
        );
      }

      RNSecureStorage.setItem("authToken", loginData.idToken, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      })
        .then(res => {
          setExpirationTime(() => {
            dispatch(authSliceActions.authenticate(loginData.idToken));
          });
        })
        .catch(err => {
          dispatch(
            uiSliceAction.setError({
              message: "Could not save auth token, please try again later!",
            }),
          );
        });
    } catch (error: any) {
      dispatch(
        uiSliceAction.setError({
          message: error.message,
        }),
      );
    }
    dispatch(uiSliceAction.setIsLoading(false));
  };
}
