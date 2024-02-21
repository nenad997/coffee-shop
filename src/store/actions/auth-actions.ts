import { Dispatch } from "redux";
import { Alert } from "react-native";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

import { signUp, login } from "../../util/authentication/auth";
import { authSliceActions } from "../slices/auth-slice";
import { uiSliceAction } from "../slices/ui-slice";

function setExpirationTime(cb?: () => void) {
  RNSecureStorage.setItem("expirationTime", "3600000", {
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
  })
    .then(res => {
      cb!();
    })
    .catch(err => {
      console.log(err);
    });
}

function setAuthTokenInStorage(
  key: string,
  token: string,
  callback: () => void,
  fallback: () => void,
) {
  RNSecureStorage.setItem(key, token, {
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
  })
    .then(res => {
      callback();
    })
    .catch(err => {
      fallback();
    });
}

function clearExpirationTime(cb?: () => void) {
  RNSecureStorage.removeItem("expirationTime")
    .then(res => {
      cb!();
    })
    .catch(err => {
      console.log(err);
    });
}

function clearAuthToken() {
  RNSecureStorage.removeItem("authToken")
    .then(res => {})
    .catch(err => {
      console.log(err);
    });
}

export function signUpAction(email: string, password: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uiSliceAction.setIsLoading(true));
      const signUpData = await signUp(email, password);

      if (!signUpData.idToken) {
        Alert.alert(
          "Signup failed",
          "User with this email address already exists! Please pick another email address or try again later!",
        );
        return;
      }

      setAuthTokenInStorage(
        "authToken",
        signUpData.idToken,
        () => {
          setExpirationTime(() => {
            dispatch(authSliceActions.authenticate(signUpData.idToken));
          });
        },
        () => {
          dispatch(
            uiSliceAction.setError({
              message: "Could not save auth token, please try again later!",
            }),
          );
        },
      );
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

      if (!loginData.idToken) {
        Alert.alert(
          "Login failed",
          "Invalid email or password, please check your credentials or try again later!",
        );
        return;
      }

      setAuthTokenInStorage(
        "authToken",
        loginData.idToken,
        () => {
          setExpirationTime(() => {
            dispatch(authSliceActions.authenticate(loginData.idToken));
          });
        },
        () => {
          dispatch(
            uiSliceAction.setError({
              message: "Could not save auth token, please try again later!",
            }),
          );
        },
      );
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

export function logoutAction() {
  return async (dispatch: Dispatch) => {
    dispatch(uiSliceAction.setIsLoading(true));

    clearExpirationTime(() => {
      clearAuthToken();
      dispatch(authSliceActions.logout());
      dispatch(uiSliceAction.setIsLoading(false));
    });
  };
}
