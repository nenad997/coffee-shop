import { API_KEY } from "../../../variables";

type Mode = "signUp" | "signInWithPassword";

async function authenticate(mode: Mode, email: string, password: string) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const responseData = await response.json();

  return responseData;
}

export function signUp(email: string, password: string) {
  return authenticate("signUp", email, password);
}

export function login(email: string, password: string) {
  return authenticate("signInWithPassword", email, password);
}

export async function getUserData(idToken?: string) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken: idToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid idToken provided!");
  }

  const responseData = await response.json();
  return responseData;
}
