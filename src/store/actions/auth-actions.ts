import { Dispatch } from "redux";
import { Alert } from "react-native";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

import { signUp, login, getUserData } from "../../util/authentication/auth";
import { authSliceActions } from "../slices/auth-slice";
import { uiSliceAction } from "../slices/ui-slice";

async function setExpirationTime(cb?: () => void) {
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

function authAction(
  email: string,
  password: string,
  getAuthData: (email: string, password: string) => Promise<any>,
  fallback: {
    title: string;
    message: string;
  },
) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uiSliceAction.setIsLoading(true));
      const authData = await getAuthData(email, password);

      if (!authData.idToken) {
        Alert.alert(fallback.title, fallback.message);
        return;
      }

      setAuthTokenInStorage(
        "authToken",
        authData.idToken,
        () => {
          setExpirationTime(() => {
            dispatch(authSliceActions.authenticate(authData.idToken));
          })
            .then(() => {
              dispatch<any>(fetchUserDataAction(authData.idToken));
            })
            .catch(error => {})
            .finally(() => {
              dispatch(uiSliceAction.setIsLoading(false));
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

export function signUpAction(email: string, password: string) {
  return authAction(
    email,
    password,
    async () => {
      return signUp(email, password);
    },
    {
      title: "Signup failed",
      message:
        "User with this email address already exists! Please pick another email address or try again later!",
    },
  );
}

export function loginAction(email: string, password: string) {
  return authAction(
    email,
    password,
    async () => {
      return login(email, password);
    },
    {
      title: "Login failed",
      message:
        "Invalid email or password, please check your credentials or try again later!",
    },
  );
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

export function fetchUserDataAction(idToken: string) {
  return async (dispatch: Dispatch) => {
    dispatch(uiSliceAction.setIsLoading(true));

    try {
      const userData = await getUserData(idToken);
      dispatch(authSliceActions.setUserCredentials(userData));

      dispatch(uiSliceAction.setIsLoading(false));
    } catch (error) {
      dispatch(
        uiSliceAction.setError({
          message: "Failed to fetch user data!",
        }),
      );
      dispatch(uiSliceAction.setIsLoading(false));
    }
  };
}
